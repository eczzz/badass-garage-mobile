// Convert this React web inventory list to React Native for Expo
// Use FlatList for the grid, convert all HTML to React Native components
// Remove the delete functionality for now, just keep edit
// Here's the web code:

import { Ionicons } from '@expo/vector-icons';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  category?: string;
  quantity: number;
  min_quantity: number;
  location?: string;
  price: number;
  sku?: string;
  image_url?: string;
}

interface InventoryListProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
}

export default function InventoryList({ items, onEdit }: InventoryListProps) {
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={64} color="#9ca3af" style={styles.emptyIcon} />
        <Text style={styles.emptyTitle}>No Items Yet</Text>
        <Text style={styles.emptyText}>
          Add your first inventory item to get started
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: InventoryItem }) => {
    const isLowStock = item.quantity <= item.min_quantity;

    return (
      <View style={styles.card}>
        {/* Header with image and title */}
        <View style={styles.cardHeader}>
          {item.image_url && (
            <Image
              source={{ uri: item.image_url }}
              style={styles.itemImage}
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            {item.category && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(item)}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={18} color="#010101" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          {/* Quantity */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity:</Text>
            <View style={styles.detailValueContainer}>
              <Text
                style={[
                  styles.detailValue,
                  isLowStock && styles.lowStockText,
                ]}
              >
                {item.quantity}
              </Text>
              {isLowStock && (
                <Ionicons
                  name="alert-circle"
                  size={16}
                  color="#dc2626"
                  style={styles.warningIcon}
                />
              )}
            </View>
          </View>

          {/* Location */}
          {item.location && (
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="location" size={14} color="#6b7280" />
                <Text style={styles.detailLabel}>Location:</Text>
              </View>
              <Text style={styles.detailValue}>{item.location}</Text>
            </View>
          )}

          {/* Price */}
          {item.price > 0 && (
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="cash" size={14} color="#6b7280" />
                <Text style={styles.detailLabel}>Price:</Text>
              </View>
              <Text style={styles.detailValue}>${item.price.toFixed(2)}</Text>
            </View>
          )}

          {/* SKU */}
          {item.sku && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>SKU:</Text>
              <Text style={styles.skuText}>{item.sku}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={1}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#010101',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  titleContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#010101',
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
  },
  editButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailValue: {
    fontSize: 14,
    color: '#010101',
    fontWeight: '500',
  },
  lowStockText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  warningIcon: {
    marginLeft: 4,
  },
  skuText: {
    fontSize: 14,
    color: '#4b5563',
    fontFamily: 'monospace',
  },
});

// End of web code - please convert above to React Native
