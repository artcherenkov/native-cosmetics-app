import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

import ClientRegistration from '../client-registration/client-registration';
import { range } from '../../../../../utils/common';
import { fetchRegistrations } from "../../../../../store/api-action";
import { setLoading } from "../../../../../store/action";
import Loading from "../../../../ui/loading/loading";

const getHourStyles = (index) => {
  const res = [styles.hourContainer];
  if (index === 24) {
    res.push({ height: 30 });
  }

  return res;
};

const formatWithLeadingZero = (number) => number < 10 ? `0${number}:00` : `${number}:00`;

// todo положить events в редакс, брать activeDate из редакса
const Agenda = (props) => {
  const { activeDate, registrations, navigation, fetchRegistrations, isLoading } = props;
  const activeDateEvents = registrations[moment(activeDate).format(`YYYY-MM-DD`)];

  useEffect(() => {
    if (!registrations[moment(activeDate).format(`YYYY-MM-DD`)]) {
      fetchRegistrations(moment(activeDate).format(`YYYY-MM-DD`));
    }
  }, [activeDate]);

  return (
      <>
        {isLoading && <Loading />}
        <ScrollView style={styles.agendaContainer}>
          {range(25).map((i) => (
              <View key={`hour-${i}`} style={getHourStyles(i)}>
                <Text style={styles.hour}>
                  {formatWithLeadingZero(i)}
                </Text>
              </View>
          ))}
          {activeDateEvents && [...activeDateEvents.events].map((item, i) => (
              <ClientRegistration
                  key={`event-${i}`}
                  navigation={navigation}
                  registration={item}
                  activeDate={activeDate}
              />
          ))}
        </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    height: 200,
    paddingLeft: 70,
    paddingTop: 15,
  },
  hourContainer: {
    borderTopWidth: 1,
    borderColor: `lightgrey`,
    position: `relative`,
    height: 60,
  },
  hour: {
    position: `absolute`,
    left: -45,
    top: -8,
    fontSize: 12,
  },
});

const mapStateToProps = (state) => ({
  registrations: state.STORE.registrations,
  isLoading: state.STATE.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchRegistrations(date) {
    dispatch(setLoading(true));
    dispatch(fetchRegistrations(date))
      .then(() => dispatch(setLoading(false)));
  },
});

export { Agenda };
export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
