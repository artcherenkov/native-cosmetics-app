import React from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import data from './data';
import Link from '../link/link';

const KnowledgeBase = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>База знаний</Text>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => <Link url={item.url} content={item.title} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginVertical: 20,
    textAlign: `center`,
  },
  list: {
    marginLeft: 20,
  },
});

KnowledgeBase.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default KnowledgeBase;
