import React from "react";
import type { LayoutProps } from "../PrintPreview";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

export default function LayoutOne({ title, data }: LayoutProps) {
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    title: { fontSize: 20, marginBottom: 10 },
    section: { marginBottom: 5 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title || "Invoice"}</Text>

        <View style={styles.section}>
          <Text>Invoice ID: {data?.id}</Text>
          <Text>Customer: {data?.customerName}</Text>
          <Text>Total: {data?.total}</Text>
        </View>

        {/* Add more invoice details here */}
      </Page>
    </Document>
  );
}