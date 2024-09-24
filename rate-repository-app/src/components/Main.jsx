import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path='/' element={<RepositoryList />} />
            <Route path='*' element={<Navigate to="/" replace />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
    </View>
  );
};

export default Main;