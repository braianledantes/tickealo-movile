import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Welcome() {
  const { onLogout, authState } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await onLogout?.();
            router.replace('./' as any);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Has iniciado sesión exitosamente</Text>
        
        {authState?.token && (
          <View style={styles.tokenInfo}>
            <Text style={styles.tokenLabel}>Token de autenticación:</Text>
            <Text style={styles.tokenText} numberOfLines={3} ellipsizeMode="middle">
              {authState.token}
            </Text>
          </View>
        )}
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Estado de autenticación:</Text>
          <View style={[styles.statusIndicator, styles.authenticated]}>
            <Text style={styles.statusText}>Autenticado ✓</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  tokenInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#495057',
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#6c757d',
    backgroundColor: '#e9ecef',
    padding: 8,
    borderRadius: 4,
  },
  statusContainer: {
    marginBottom: 30,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  statusIndicator: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  authenticated: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#155724',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});