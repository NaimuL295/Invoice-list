import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

export default function LayoutFour({ title, data }: { title?: string; data?: any }) {
  const styles = StyleSheet.create({
    page: { padding: 24, fontSize: 12, backgroundColor: "#f3f4f6" }, // bg-gray-100 p-6
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 }, // text-2xl font-bold mb-3
    section: { marginBottom: 8 }, // mb-2
    item: { marginBottom: 4 }, // mb-1
    headerText: { fontSize: 14, fontWeight: "bold" }, // text-base font-bold
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title || "Invoice Layout Four"}</Text>

        <View style={styles.section}>
          <Text style={styles.headerText}>Invoice Details:</Text>
          <Text>Invoice ID: {data?.id}</Text>
          <Text>Customer: {data?.customerName}</Text>
          <Text>Total: {data?.total}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.headerText}>Items:</Text>
          {data?.items?.map((item: any, index: number) => (
            <Text style={styles.item} key={index}>
              {item.name} — {item.quantity} × {item.price}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}