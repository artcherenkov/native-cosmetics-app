import React from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList, SafeAreaView } from 'react-native';

import Link from '../link/link';

const data = [
  {
    title: `Скрипты на перезапись`,
    url: `https://docs.google.com/document/d/1SY7lFdL_Nb-FkJKJD6YqTMr6FX5ICFnyAtINtznl7oU/edit`,
  },
  {
    title: `Скрипты на доп. зону`,
    url: `https://docs.google.com/document/d/1fb7sjPa2I0IhY20ii5Nw4UFnerSaw_pqjPRgTg7lEVQ/edit`,
  },
  {
    title: `Акции`,
    url: `https://docs.google.com/spreadsheets/d/1BLJwNgZK2sdi7I4z-d69Yx8nwV6mIIsJcWf2IAEH9Bc/edit#gid=17982085`,
  },
  {
    title: `Прайс`,
    url: `https://docs.google.com/spreadsheets/d/1ljE7Pma6awUV4ew6IJV2DZ_zFS3I7xUe14guh_U1DT8/edit#gid=1037448712`,
  },
  {
    title: `База важных телефонных номеров`,
    url: `https://docs.google.com/document/d/1vcpV0PGIjfbsg_5wvRe8-xEijQdLY8b3AI4YwbOOljo/edit`,
  },
  {
    title: `Финансовая записка`,
    url: `https://docs.google.com/spreadsheets/d/1_SehpmPL1ykXLl-aAxrbaRiZhtZwbxFui0FNYs1hThQ/edit#gid=0`,
  },
  {
    title: `Тайные клиенты`,
    url: `https://docs.google.com/document/d/1155Xf34-uoNaiC68zGOkTqoxQrpaoPdTBoV-WCj5DBw/edit`,
  },
  {
    title: `Зонирование`,
    url: `https://docs.google.com/spreadsheets/d/19Wog8WkzJGfOj-W9TEOC9DAwBssnLpGPipax3yRYj6g/edit#gid=0`,
  },
  {
    title: `Ежедневный опросник`,
    url: ``,
  },
  {
    title: `Ответы с опросника с планами`,
    url: ``,
  },
];

const KnowledgeBase = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 28, marginVertical: 20, textAlign: `center` }}>База знаний</Text>
        <FlatList
          style={{ marginLeft: 20 }}
          data={data}
          renderItem={({ item, index }) => (
              <Link url={item.url} style={{ marginBottom: 25 }}>
                <Text style={{ fontSize: 22, color: `rgb(13, 128, 254)` }}>{item.title}</Text>
              </Link>
          )}
          keyExtractor={(item, i) => i.toString()}
        />
    </SafeAreaView>
  );
};

KnowledgeBase.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default KnowledgeBase;
