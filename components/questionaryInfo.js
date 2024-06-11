import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from "react-native";

const QuestInfo = () => {
    const Asks = {
        SetorA: [
            "Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?",
            "Com que frequência você tem dificuldade para fazer um trabalho que exige organização?",
            "Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?",
            "Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado (a) por muito tempo?",
            "Com que frequência você se sente ativo (a) demais e necessitando fazer coisas, como se estivesse “com um motor ligado”?"
        ],
        SetorB: [
            "Com que frequência você comete erros bobos por falta de atenção quando tem de trabalhar num projeto chato ou difícil?",
            "Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?",
            "Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?",
            "Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?",
            "Com que frequência você se distrai com atividades ou barulho a sua volta?",
            "Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado (a)?",
            "Com que frequência você se sente inquieto (a) ou agitado (a)?",
            "Com que frequência você tem dificuldade para sossegar e relaxar quando tem tempo livre para você?",
            "Com que frequência você se pega falando demais em situações sociais?",
            "Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?",
            "Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?",
            "Com que frequência você interrompe os outros quando eles estão ocupados?"
        ],
        SetorC: [
            "Esses problemas que você vem tendo, são recorrentes desde que idade?",
            "Essas dificuldades que você tem, aparecem em que áreas? Em exemplo trabalho, faculdade ou social",
            "Você sente dificuldades na vida diária por causa desses sintomas?",
            "Você é diagnosticado com algo que não é TDAH? Em exemplo Ansiedade ou psicose"
        ]
    };

    const [currentSetor, setCurrentSetor] = useState("SetorA");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleSelectOption = () => {
        const questionsLength = Asks[currentSetor].length;
        if (currentQuestionIndex < questionsLength - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const setors = Object.keys(Asks);
            const currentSetorIndex = setors.indexOf(currentSetor);
            if (currentSetorIndex < setors.length - 1) {
                setCurrentSetor(setors[currentSetorIndex + 1]);
                setCurrentQuestionIndex(0);
            } else {
                console.log("Questionnaire complete");
            }
        }
    };

    const handleGoBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            const setors = Object.keys(Asks);
            const currentSetorIndex = setors.indexOf(currentSetor);
            if (currentSetorIndex > 0) {
                const previousSetor = setors[currentSetorIndex - 1];
                setCurrentSetor(previousSetor);
                setCurrentQuestionIndex(Asks[previousSetor].length - 1);
            }
        }
    };

    const renderCurrentQuestion = () => {
        const question = Asks[currentSetor][currentQuestionIndex];
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
                    <View style={styles.questionContainer} className="justify-between">
                        <View className="bg-slate-200 mx-2 px-2 py-10 rounded-sm">
                            <Text style={styles.questionText}>{question}</Text>
                        </View>
                        {currentSetor === "SetorC" ? (
                            <View style={styles.inputContainer}>
                                <TextInput
                                className="mt-5"
                                    style={styles.textInput}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Digite sua resposta aqui..."
                                    onSubmitEditing={handleSelectOption}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handleSelectOption}>
                                    <Text style={styles.submitButtonText}>Próxima</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.radioGroup} className="px-2">
                                {["Nunca", "Quase Nunca", "Às vezes", "Quase Sempre", "Sempre"].map((option, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.radioContainer}
                                        onPress={handleSelectOption}
                                    >
                                        <Text style={styles.radioText}>○ {option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.navigationContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                {renderCurrentQuestion()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    questionContainer: {
        marginBottom: 15,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    radioGroup: {
        flexDirection: "collum",
        justifyContent: "space-between",
        marginTop: 10,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioText: {
        fontSize: 16,
    },
    textInput: {
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    submitButton: {
        marginTop: 10,
        backgroundColor: '#633DE8',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default QuestInfo;
