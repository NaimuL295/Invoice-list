import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Invoice, subItem } from "../../../../../types/type";
import { toWords} from 'to-words/en-US';


// Defining the props interface to prevent the colon error
interface LayoutProps {
  title?: string;
 data:Invoice
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  headerSection: {
    backgroundColor: "#9ca3af", 
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    color: "black",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  invoiceTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#7c3aed",
    marginVertical: 10,
    textTransform: "capitalize",
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#9ca3af",
    padding: 5,
    color: "white",
    fontWeight: "bold",
  },
  infoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: 10,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#9ca3af",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#9ca3af",
    color: "white",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    minHeight: 25,
    alignItems: "center",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontWeight: "bold",
    minHeight: 25,
    alignItems: "center",
  },
  col1: { width: "5%", textAlign: "center", borderRightWidth: 1, borderRightColor: "#9ca3af", padding: 4 },
  col2: { width: "35%", borderRightWidth: 1, borderRightColor: "#9ca3af", padding: 4 },
  col3: { width: "15%", textAlign: "center", borderRightWidth: 1, borderRightColor: "#9ca3af", padding: 4 },
  col4: { width: "15%", textAlign: "center", borderRightWidth: 1, borderRightColor: "#9ca3af", padding: 4 },
  col5: { width: "15%", textAlign: "right", borderRightWidth: 1, borderRightColor: "#9ca3af", padding: 4 },
  col6: { width: "15%", textAlign: "right", padding: 4 },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  summaryBox: {
    width: "48%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 4,
  },
  amountWordsLabel: {
    backgroundColor: "#9ca3af",
    color: "white",
    padding: 4,
    fontWeight: "bold",
    marginBottom: 5,
  }
});

export default function LayoutTwo({ title, data }: LayoutProps) {
 
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
        
        <View style={styles.headerSection}>
          <View><Text style={{ color: 'white' }}>Logo</Text></View>
          <View>
            <Text style={styles.companyName}>{invoiceData.user.email}</Text>
            <Text style={{ textAlign: 'right', fontSize: 8 }}>Email: {invoiceData.companyEmail}</Text>
          </View>
        </View>

        <Text style={styles.invoiceTitle}>{title || "Invoice"}</Text>

        <View style={styles.infoBar}>
          <Text style={{ width: '50%' }}>Bill To</Text>
          <Text style={{ width: '50%', textAlign: 'right' }}>Invoice Details</Text>
        </View>
        
        <View style={styles.infoContent}>
          <Text style={{ fontWeight: 'bold' }}>{invoiceData.billTo}</Text>
          <View>
            <Text style={{ textAlign: 'right' }}>Invoice No.: {invoiceData.invoiceNo}</Text>
            <Text style={{ textAlign: 'right' }}>Date: {invoiceData.date}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>#</Text>
            <Text style={styles.col2}>Item Name</Text>
            <Text style={styles.col3}>Quantity</Text>
            <Text style={styles.col4}>Unit</Text>
            <Text style={styles.col5}>Price/ Unit</Text>
            <Text style={styles.col6}>Amount</Text>
          </View>

          {invoiceData.items.map((item: subItem, index: number) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.col1}>{index + 1}</Text>
              <Text style={styles.col2}>{item.item_name}</Text>
              <Text style={styles.col3}>{item.quantity}</Text>
              <Text style={styles.col4}>{item.unit}</Text>
              <Text style={styles.col5}> {Number(item.price)}</Text>
              <Text style={styles.col6}> {(Number(item.price) * Number(item.quantity))}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={{ ...styles.col1, borderRightWidth: 0 }}></Text>
            <Text style={{ ...styles.col2, fontWeight: 'bold' }}>Total</Text>
            <Text style={{ ...styles.col3, fontWeight: 'bold' }}>
               {/* {invoiceData.items.reduce((sum, item) => sum + Number(item.quantity), 0)} */}
            </Text>
            <Text style={styles.col4}></Text>
            <Text style={styles.col5}></Text>
            <Text style={{ ...styles.col6, fontWeight: 'bold' }}> {invoiceData.subtotal}</Text>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.amountWordsLabel}>Invoice Amount In Words:</Text>
            <Text style={{ marginBottom: 15 }}>{toWords(invoiceData.subtotal)}</Text>
            
            <Text style={styles.amountWordsLabel}>Terms and conditions</Text>
            {/* <Text style={{ fontSize: 8 }}>{invoiceData.terms}</Text> */} 
          </View>

          <View style={styles.summaryBox}>
            <View style={{ ...styles.summaryRow, backgroundColor: '#9ca3af', color: 'white', padding: 4 }}>
              <Text>Amounts</Text>
              <Text></Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Sub Total</Text>
              <Text> {invoiceData.subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Discount ({invoiceData.discount} )</Text>
              <Text> {((invoiceData.subtotal * invoiceData.discount) / 100)}</Text>
            </View>
            <View style={{ ...styles.summaryRow, fontWeight: 'bold' }}>
              <Text>Total</Text>
              <Text> {invoiceData.total}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Received</Text>
              <Text> {invoiceData.received}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Balance</Text>
              <Text> {(invoiceData.total - invoiceData.received)}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40, alignItems: 'flex-end' }}>
          <View style={{ borderTopWidth: 1, borderTopColor: '#000', width: 150, paddingTop: 5 }}>
            <Text style={{ textAlign: 'center', fontSize: 9 }}>Authorized Signatory</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}