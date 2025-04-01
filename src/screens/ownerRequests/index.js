import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TopBarCard2 } from "../../components";
import { statusBarHeight } from "../../utils/config/config";
import { colors } from "../../common";

const OwnerRequests = ({ navigation }) => {
    const [flats, setFlats] = useState([
        { id: 1, number: "101", isApproved: false },
        { id: 2, number: "102", isApproved: false },
        { id: 3, number: "103", isApproved: false },
      
    ]);

    const handleApprove = (id) => {
        setFlats((prevFlats) =>
            prevFlats.map((flat) =>
                flat.id === id ? { ...flat, isApproved: true } : flat
            )
        );
    };

    const handleReject = (id) => {
        setFlats((prevFlats) =>
            prevFlats.map((flat) =>
                flat.id === id ? { ...flat, isApproved: false } : flat
            )
        );
    };

    return (
        <View style={styles.mainCon}>
            <View style={{ height: 70, marginTop: statusBarHeight }}>
                <TopBarCard2 back={true} txt={'Flat Owners'} navigation={navigation} />
            </View>

            <View style={styles.header}>
                <View style={styles.headercon}>
                    <Text style={styles.headerCell}>Flat no</Text>
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.headercon}>
                    <Text style={styles.headerCell}>Approve/Reject</Text>
                </View>
            </View>

           
            {flats.map((flat) => (
                <View key={flat.id} style={styles.row}>
                    <View style={styles.headercon}>
                        <Text style={styles.headerCell}>{flat.number}</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.approveButton,
                                {
                                    backgroundColor: flat.isApproved ? "grey" : "green",
                                },
                            ]}
                            onPress={() => handleApprove(flat.id)}
                        >
                            <Text style={styles.buttonText}>Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rejectButton}
                            onPress={() => handleReject(flat.id)}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    mainCon: {
        height: '100%',
        backgroundColor: colors.white,
    },
    header: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.gray4,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
        marginTop: 20,
        marginHorizontal: '5%',
       
    },
    headercon: {
        width: '40%',
        justifyContent: 'center',
        marginHorizontal: 1,
        overflow: 'hidden',
        height: 40,
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black,
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: colors.gray2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
        marginHorizontal: '5%',
    },
    // rowCell: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    flatNumberText: {
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:"5%"
    },
    approveButton: {
        padding: 10,
        borderRadius: 5,
        marginRight: 10, // Space between buttons
    },
    rejectButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "red",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default OwnerRequests;
