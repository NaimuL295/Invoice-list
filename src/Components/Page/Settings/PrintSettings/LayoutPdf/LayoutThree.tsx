
import { Document, Page, View, Text, StyleSheet,  } from "@react-pdf/renderer";

import { toWords} from 'to-words/en-US';
// Helper for "Amount in words" (Install 'to-words' if not present)
// import { ToWords } from 'to-words'; 
// const toWords = new ToWords();

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
  },
  // Main Border Container
  container: {
    border: "1pt solid #ccc",
    height: "100%",
  },
  headerTitle: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    borderBottom: "1pt solid #ccc",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  // Logo and Company Section
  companySection: {
    flexDirection: "row",
    padding: 15,
    borderBottom: "1pt solid #ccc",
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  companyDetails: {
    flex: 1,
    backgroundColor: "#eef5ff",
    padding: 10,
    border: "1pt dashed #adc6ff",
  },
  // Info Bar (Bill To / Invoice Details)
  infoBar: {
    flexDirection: "row",
    borderBottom: "1pt solid #ccc",
    backgroundColor: "#f9f9f9",
  },
  infoCol: {
    flex: 1,
    padding: 5,
    borderRight: "1pt solid #ccc",
  },
  label: { fontWeight: "bold", marginBottom: 2 },

  // Table Styles
  table: {
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #ccc",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  col1: { width: "5%", borderRight: "1pt solid #ccc", textAlign: "center", padding: 4 },
  col2: { width: "40%", borderRight: "1pt solid #ccc", padding: 4 },
  col3: { width: "15%", borderRight: "1pt solid #ccc", textAlign: "center", padding: 4 },
  col4: { width: "10%", borderRight: "1pt solid #ccc", textAlign: "center", padding: 4 },
  col5: { width: "15%", borderRight: "1pt solid #ccc", textAlign: "right", padding: 4 },
  col6: { width: "15%", textAlign: "right", padding: 4 },

  // Summary Section
  summaryContainer: {
    flexDirection: "row",
   // Pushes to bottom of main container if flex-grow is used
    borderTop: "1pt solid #ccc",
  },
  summaryLeft: {
    width: "65%",
    borderRight: "1pt solid #ccc",
    padding: 10,
  },
  summaryRight: {
    width: "35%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    borderBottom: "0.5pt solid #eee",
  },
  totalRow: {
    backgroundColor: "#f9f9f9",
    fontWeight: "bold",
    borderBottom: "1pt solid #ccc",
  },
  footer: {
    borderTop: "1pt solid #ccc",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  amountWordsLabel:{
    backgroundColor: "#9ca3af",
    color: "white",
    padding: 4,
    fontWeight: "bold",
    marginBottom: 5,
  }
});

import type { Invoice, subItem } from "../../../../../types/type";


// Defining the props interface to prevent the colon error
interface LayoutProps {
  title?: string;
 data:Invoice
}

export default function LayoutThree({ title, data }: LayoutProps) {

 const invoiceData = {
    user_name: data?.user_name || "Company Name",
    companyEmail: data?.email || "email@example.com",
    invoiceNo: data?.uid || "0",
    billTo: data?.customer || "Customer Name",
    date: data?.date || "00-00-0000",
    items: data?.items || [],
    received: Number(data?.received) || 0,
    discount: Number(data?.discount) || 0,
    subtotal: Number(data?.subtotal || data?.total) || 0,
     user: data?.user || null, 
    total: Number(data?.total) || 0,
    
  };







  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>{title || "Invoice"}</Text>

          {/* Company Info */}
          <View style={styles.companySection}>
            <View style={styles.logoBox}><Text style={{color: "#fff"}}>LOGO</Text></View>
            <View style={styles.companyDetails}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{data?.user.user_name }</Text>
              <Text>Email: {data?.user.email }</Text>
            </View>
          </View>

          {/* Customer Info */}
          <View style={styles.infoBar}>
            <View style={styles.infoCol}>
              <Text style={styles.label}>Bill To:</Text>
              <Text>{data?.customer || "Customer"}</Text>
            </View>
            <View style={[styles.infoCol, { borderRight: 0 }]}>
              <Text style={styles.label}>Invoice Details:</Text>


              
              <Text>No: {data?.id || "0"}</Text>
              <Text>Date: {data?.date || "30-03-2026"}</Text>
            </View>
          </View>

          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col1}>#</Text>
            <Text style={styles.col2}>Item Name</Text>
            <Text style={styles.col3}>Quantity</Text>
            <Text style={styles.col4}>Unit</Text>
            <Text style={styles.col5}>Price/Unit</Text>
            <Text style={styles.col6}>Amount</Text>
          </View>

          {/* Table Body */}
          {data?.items?.map((item: subItem, index: number) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.col1}>{index + 1}</Text>
              <Text style={styles.col2}>{item.item_name}</Text>
              <Text style={styles.col3}>{item.quantity}</Text>
              <Text style={styles.col4}>{item.unit || 'Box'}</Text>
              <Text style={styles.col5}>{item.price.toFixed(2)}</Text>
              <Text style={styles.col6}>{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}

          {/* Summary Section */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryLeft}>
              <Text style={styles.amountWordsLabel}>Invoice Amount In Words:</Text>
                <Text style={{ marginBottom: 15 }}>{toWords(invoiceData.subtotal)}</Text>
              <Text style={{ fontWeight: 'bold' }}>Terms And Conditions:</Text>
              <Text style={{ marginTop: 5, color: '#666' }}>Thank you for doing business with us.</Text>
            </View>
            <View style={styles.summaryRight}>
              <View style={styles.summaryRow}><Text>Sub Total:</Text><Text>{invoiceData?.subtotal}</Text></View>
              <View style={styles.summaryRow}><Text>Discount ({data?.discount}%):</Text><Text>{invoiceData?.discount}</Text></View>
              <View style={[styles.summaryRow, styles.totalRow]}><Text>Total:</Text><Text>{invoiceData?.total}</Text></View>
              <View style={{ padding: 4 }}>
                <Text style={{ fontSize: 8 }}>Received: {invoiceData?.received}</Text>
                <Text style={{ fontSize: 8 }}>Balance: {invoiceData?.subtotal}</Text>
              </View>
            </View>
          </View>

          {/* Footer Signatory */}
          <View style={styles.footer}>
             <View />
             <View style={{ alignItems: 'center' }}>
                <Text>For {data?.user_name || "Dev First"}:</Text>
                <View style={{ marginTop: 20, borderTop: '1pt dashed #000', width: 100, paddingTop: 5 }}>
                  <Text style={{ fontSize: 8 }}>Authorized Signatory</Text>
                </View>
             </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}