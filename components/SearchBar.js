import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from "react-native";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      style = {styles.searchbar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
    searchbar: {
        borderRadius: 16,
    }
  });

export default SearchBar;