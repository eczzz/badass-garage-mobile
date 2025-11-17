import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AuthForm from '../auth-form';
import InventoryList from '../inventory-list';

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: '1',
    name: '1967 Mustang Fastback',
    description: 'Classic muscle car in excellent condition',
    category: 'Vehicles',
    quantity: 1,
    min_quantity: 1,
    location: 'Bay 3',
    price: 45000,
    sku: 'CAR-001',
    image_url: 'https://images.unsplash.com/photo-1584345604476-8ec5f4d6c952?w=200',
  },
  {
    id: '2',
    name: 'Vintage Gas Pump',
    description: 'Restored 1950s Shell gas pump',
    category: 'Memorabilia',
    quantity: 2,
    min_quantity: 1,
    location: 'Showroom A',
    price: 2500,
    sku: 'PUMP-045',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
  },
  {
    id: '3',
    name: 'Chrome Bumper Set',
    description: 'Universal chrome bumper kit',
    category: 'Parts',
    quantity: 5,
    min_quantity: 3,
    location: 'Shelf B2',
    price: 450,
    sku: 'PART-128',
  },
  {
    id: '4',
    name: 'Neon Bar Sign',
    description: 'Custom Route 66 neon sign',
    category: 'Signs',
    quantity: 1,
    min_quantity: 2,
    location: 'Storage',
    price: 800,
    sku: 'SIGN-009',
    image_url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=200',
  },
];

export default function HomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  const handleEdit = (item: any) => {
    alert(`Edit: ${item.name}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Badass Garage Inventory</Text>
        <Text style={styles.subtitle}>{MOCK_INVENTORY.length} items in stock</Text>
      </View>
      
      <View style={styles.content}>
        <InventoryList items={MOCK_INVENTORY} onEdit={handleEdit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f9',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#010101',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  content: {
    padding: 16,
  },
});