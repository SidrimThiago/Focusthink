import React, { useEffect, useState } from "react";
import MapView from 'react-native-maps';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MMKV } from "react-native-mmkv";
import axios from "axios";
import { API_URL } from '../../.env/config';

const storage = new MMKV();

export default function Consultorio() {
    const nomeUser = storage.getString("user.nameUser");
    const [dados, setDados] = useState(null);
    const [consultorioDetails, setConsultorioDetails] = useState({
        Nome: '',
        Bairro: '',
        Rua: '',
        Numero: '',
        Complemento: '',
        Cep: '',
        Estado: '',
        Cidade: ''
    });

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await axios.get(`${API_URL}/ExplainConsultorio`, {
                    params: { nomeUser }
                });
                const data = response.data;
                setDados(data.data);
                setConsultorioDetails(data.data.consultorio);
            } catch (error) {
                console.error('Erro ao puxar os dados do consultório :', error);
            }
        };

        fetchDados();
    }, [nomeUser]);

    const handleInputChange = (field, value) => {
        setConsultorioDetails({ ...consultorioDetails, [field]: value });
    };

    const handleEdit = async () => {
        try {
            await axios.post(`${API_URL}/EditConsultorio`, {
                nomeUser,
                consultorioDetails
            });
            alert("Dados do consultório atualizados com sucesso!");
        } catch (error) {
            console.error("Erro ao editar os dados do consultório:", error);
            alert("Erro ao atualizar os dados do consultório.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View>
                        <Text style={styles.title}>Meu consultório</Text>
                    </View>

                    <View>
                        <MapView style={styles.map} />
                    </View>

                    <View>
                        <Text style={styles.title}>Fotos</Text>
                        <ScrollView horizontal>
                            <Image source={{ uri: 'url_da_foto' }} style={styles.photo} />
                            <Image source={{ uri: 'url_da_foto' }} style={styles.photo} />
                        </ScrollView>
                    </View>

                    <View>
                        <Text style={styles.title}>Informações</Text>

                        <View style={styles.infoContainer}>
                            <Text style={styles.text}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o nome do consultório"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Nome}
                                onChangeText={(text) => handleInputChange('Nome', text)}
                            />
                            <Text style={styles.text}>Bairro</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o bairro"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Bairro}
                                onChangeText={(text) => handleInputChange('Bairro', text)}
                            />
                            <Text style={styles.text}>Rua</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite a rua"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Rua}
                                onChangeText={(text) => handleInputChange('Rua', text)}
                            />
                            <Text style={styles.text}>Número</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o número"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Numero}
                                onChangeText={(text) => handleInputChange('Numero', text)}
                            />
                            <Text style={styles.text}>Complemento</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o complemento"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Complemento}
                                onChangeText={(text) => handleInputChange('Complemento', text)}
                            />
                            <Text style={styles.text}>Cep</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o CEP"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Cep}
                                onChangeText={(text) => handleInputChange('Cep', text)}
                            />
                            <Text style={styles.text}>Estado</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o estado"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Estado}
                                onChangeText={(text) => handleInputChange('Estado', text)}
                            />
                            <Text style={styles.text}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite a cidade"
                                placeholderTextColor="#ccc"
                                value={consultorioDetails.Cidade}
                                onChangeText={(text) => handleInputChange('Cidade', text)}
                            />

                            <Button title="Editar dados" onPress={handleEdit} />
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 20,
    },
    map: {
        width: "100%",
        height: 300,
        marginVertical: 20,
    },
    photo: {
        width: 100,
        height: 100,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
    },
    text: {
        fontSize: 18,
        color: 'white',
        marginVertical: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        padding: 5,
    },
});
