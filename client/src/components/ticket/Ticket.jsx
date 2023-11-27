import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode.react";

const Ticket = ({
  movieName,
  seatNumbers,
  screenNumber,
  duration,
  time,
  orderNo,
}) => {
  return (
    <Document>
      <Page size="A6">
        <View style={{ margin: 10, textAlign: "center" }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Ticket Summary</Text>
          <Text>Movie: {movieName}</Text>
          <Text>Seat Numbers: {seatNumbers}</Text>
          <Text>Screen Number: {screenNumber}</Text>
          <Text>Duration: {duration}</Text>
          <Text>Time: {time}</Text>
          <Text>Order Number: {orderNo}</Text>
          <View style={{ textAlign: "center", marginTop: 10 }}>
            <QRCode value={orderNo} size={100} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Ticket;
