import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTitle } from "../hooks/use-title";
import DateUtils from "../utils/functions/formatDate";

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 12,
        padding: 30,
    },
    viewer: {
        width: "100vw",
        height: "100vh",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    invoiceInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    invoiceInfoText: {
        fontSize: 10,
    },
    billTo: {
        marginTop: 20,
    },
    billToText: {
        fontSize: 12,
    },
    table: {
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    tableHeaderCell: {
        flexGrow: 1,
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCell: {
        flexGrow: 1,
        textAlign: "center",
        padding: 5,
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
    },
    total: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    totalText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: "center",
        fontSize: 10,
        color: "gray",
    },
});

const InvoiceDocument = ({ data }) => {
    const { orderId } = useParams();
    useTitle(`Invoice #${orderId}`);

    console.log(data);

    if (data.length === 0) {
        return <div>You can't access the PDF document from a direct link.</div>;
    }

    const renderedItems = data.products.map((item) => (
        <View style={styles.tableRow} key={item.id}>
            <Text style={[styles.tableCell, { width: "40%" }]}>
                {item.title}
            </Text>
            <Text style={[styles.tableCell, { width: "20%" }]}>
                {item.quantity}
            </Text>
            <Text style={[styles.tableCell, { width: "20%" }]}>
                ${item.price.toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, { width: "20%" }]}>
                ${(item.price * item.quantity).toFixed(2)}
            </Text>
        </View>
    ));

    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Invoice</Text>
                        <Text>Date: {new Date().toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.invoiceInfoText}>
                            Invoice #{data._id}
                        </Text>
                        <Text style={styles.invoiceInfoText}>
                            Due Date:{" "}
                            {DateUtils.formatTimestamp(data.createdAt)}
                        </Text>
                    </View>
                    <View style={styles.billTo}>
                        <Text style={styles.billToText}>
                            Bill To: {data._user}
                        </Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "40%" },
                                ]}
                            >
                                Item
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "20%" },
                                ]}
                            >
                                Quantity
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "20%" },
                                ]}
                            >
                                Price
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "20%" },
                                ]}
                            >
                                Total
                            </Text>
                        </View>
                        {renderedItems}
                    </View>
                    <View style={styles.total}>
                        <Text style={styles.totalText}>
                            Total: ${(data.total / 100).toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <Text>Thank you for your business!</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

const InvoiceDocumentWrapper = () => {
    const data = useSelector((state) => state.orders.data);
    return <InvoiceDocument data={data} />;
};

export default InvoiceDocumentWrapper;
