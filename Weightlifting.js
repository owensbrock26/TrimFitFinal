import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import TrashCan from "./assets/images/TrashCan.png";
import BackButton from "./assets/images/BackButton.png";
import EditButton from "./assets/images/EditButton.png";
import ResetButton from "./assets/images/ResetButton.png";
import Done from "./assets/images/Done.png";
import MyBannerAdComponent from "./MyBannerAdComponent";

const initialExercises = [
  { id: "1", name: "Exercise 1", reps: "3x12", weight: "15lbs" },
  { id: "2", name: "Exercise 2", reps: "3x12", weight: "15lbs" },
  { id: "3", name: "Exercise 3", reps: "3x12", weight: "15lbs" },
];

const initialWorkouts = [
  { id: "1", name: "Workout 1", exercises: initialExercises },
  { id: "2", name: "Workout 2", exercises: initialExercises },
  { id: "3", name: "Workout 3", exercises: initialExercises },
];

const Weightlifting = ({ setToolPage }) => {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [exercises, setExercises] = useState(initialExercises);
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [showEditWorkout, setShowEditWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedWorkouts, setEditedWorkouts] = useState({});
  const [screen, setScreen] = useState("Weightlifting");
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [editedExerciseName, setEditedExerciseName] = useState("");
  const [editExerciseMode, setEditExerciseMode] = useState(false);

  const [isEditingWorkoutName, setIsEditingWorkoutName] = useState(false);




  useEffect(() => {
    const loadWorkouts = async () => {
      const savedWorkouts = await AsyncStorage.getItem("workouts");
      if (savedWorkouts) {
        setWorkouts(JSON.parse(savedWorkouts));
      }
    };

    const loadExercises = async () => {
      const savedExercises = await AsyncStorage.getItem("exercises");
      if (savedExercises) {
        setExercises(JSON.parse(savedExercises));
      }
    };

    loadWorkouts();
    loadExercises();
  }, []);

  useEffect(() => {
    const saveWorkouts = async () => {
      await AsyncStorage.setItem("workouts", JSON.stringify(workouts));
    };

    const saveExercises = async () => {
      await AsyncStorage.setItem("exercises", JSON.stringify(exercises));
    };

    saveWorkouts();
    saveExercises();
  }, [workouts, exercises]);

  const toggleCheckExercise = (exercise) => {
    if (checkedExercises.includes(exercise)) {
      setCheckedExercises(checkedExercises.filter((e) => e !== exercise));
    } else {
      setCheckedExercises([...checkedExercises, exercise]);
    }
  };

  const resetChecks = () => {
    setCheckedExercises([]);
  };

  const handleEditMode = () => {
    if (editMode) {
      const newWorkouts = workouts.map((workout) => {
        let newName =
          workout.id in editedWorkouts
            ? editedWorkouts[workout.id]
            : workout.name;
        return { ...workout, name: newName };
      });
      setWorkouts(newWorkouts);
      setEditedWorkouts({});
    }
    setEditMode(!editMode);
  };

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleEditExercise = (id) => {
    const exercise = exercises.find((exercise) => exercise.id === id);
    if (exercise) {
      setEditedExerciseName(exercise.name);
    }
    setEditingExerciseId(id);
  };

  const handleDoneEditingExercise = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === selectedWorkout.id
          ? {
              ...workout,
              exercises: workout.exercises.map((exercise) =>
                exercise.id === id
                  ? { ...exercise, name: editedExerciseName }
                  : exercise
              ),
            }
          : workout
      )
    );
    setEditingExerciseId(null);
    setEditedExerciseName(""); // Reset the editedExerciseName
  };

  const handleExerciseEditMode = () => {
    setEditExerciseMode(!editExerciseMode);
    setIsEditingWorkoutName(!isEditingWorkoutName);
  };

  const handleAddWorkout = () => {
    const newWorkout = { id: Date.now().toString(), name: "New Workout" };
    setWorkouts([...workouts, newWorkout]);
    setSelectedWorkout(newWorkout);
    setShowEditWorkout(true);
    setShowAddWorkout(false);
  };

  const handleEditWorkout = (id, name) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id ? { ...workout, name } : workout
      )
    );
    setSelectedWorkout(null);
    setShowEditWorkout(false);
  };

  const handleDeleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  handleExerciseNameChange = (id, text) => {
    // Find the exercise with the given id
    const exerciseIndex = selectedWorkout.exercises.findIndex(
      (exercise) => exercise.id === id
    );

    // If the exercise is found, update its name
    if (exerciseIndex !== -1) {
      let updatedExercises = [...selectedWorkout.exercises];
      updatedExercises[exerciseIndex].name = text;

      // Update the state
      setSelectedWorkout({
        ...selectedWorkout,
        exercises: updatedExercises,
      });
    }
  };

  const handleAddExercise = () => {
    if (!selectedWorkout) {
      console.error("No workout selected");
      return;
    }

    const newExercise = {
      id: Date.now().toString(),
      name: "Exercise",
      reps: "3x12",
      weight: "15lbs",
    };
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.id === selectedWorkout.id) {
        const updatedExercises = workout.exercises
          ? [...workout.exercises, newExercise]
          : [newExercise];
        return { ...workout, exercises: updatedExercises };
      } else {
        return workout;
      }
    });
    setWorkouts(updatedWorkouts);
    setSelectedWorkout(
      updatedWorkouts.find((workout) => workout.id === selectedWorkout.id)
    );
  };
  const handleWorkoutNameChange = (id, newName) => {
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.id === id) {
        return { ...workout, name: newName };
      } else {
        return workout;
      }
    });

    setWorkouts(updatedWorkouts);
    setSelectedWorkout(updatedWorkouts.find((workout) => workout.id === id));
  };

  const handleDeleteExercise = (workoutId, exerciseId) => {
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: workout.exercises.filter(
            (exercise) => exercise.id !== exerciseId
          ),
        };
      } else {
        return workout;
      }
    });
    setWorkouts(updatedWorkouts);
    setSelectedWorkout(
      updatedWorkouts.find((workout) => workout.id === selectedWorkout.id)
    ); // Update selectedWorkout
  };

  const renderRightAction = (id, type) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          if (type === "workout") {
            handleDeleteWorkout(id);
          } else if (type === "exercise") {
            handleDeleteExercise(selectedWorkout.id, id);
          }
        }}
      >
        <Image source={TrashCan} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    );
  };

  const handleUpdateExercise = (id, field, value) => {
    // Update the exercise with the given ID
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        return { ...exercise, [field]: value };
      } else {
        return exercise;
      }
    });
    setExercises(updatedExercises);
  };

  handleExerciseWeightChange = (id, weight) => {
    // Find the exercise with the given id
    const exerciseIndex = selectedWorkout.exercises.findIndex(
      (exercise) => exercise.id === id
    );

    // If the exercise is found, update its weight
    if (exerciseIndex !== -1) {
      let updatedExercises = [...selectedWorkout.exercises];
      updatedExercises[exerciseIndex].weight = weight;

      // Update the state
      setSelectedWorkout({
        ...selectedWorkout,
        exercises: updatedExercises,
      });
    }
  };

  handleExerciseRepsChange = (id, reps) => {
    // Find the exercise with the given id
    const exerciseIndex = selectedWorkout.exercises.findIndex(
      (exercise) => exercise.id === id
    );

    // If the exercise is found, update its reps
    if (exerciseIndex !== -1) {
      let updatedExercises = [...selectedWorkout.exercises];
      updatedExercises[exerciseIndex].reps = reps;

      // Update the state
      setSelectedWorkout({
        ...selectedWorkout,
        exercises: updatedExercises,
      });
    }
  };

  const handleExerciseChange = (id, field, value) => {
    setWorkouts((prevWorkouts) => {
      return prevWorkouts.map((workout) => {
        return {
          ...workout,
          exercises: workout.exercises.map((exercise) => {
            if (exercise.id === id) {
              return { ...exercise, [field]: value };
            } else {
              return exercise;
            }
          }),
        };
      });
    });
  };

  
return (
  <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#17181a" }}>
    <View style={styles.backButton1}>
     <TouchableOpacity
        style={styles.backButton1}
        onPress={() => setToolPage(null)}
      >
        <Image
          source={BackButton}
          style={{ width: 35, height: 35 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      </View>
    <View style={styles.bannerAd}>
      <MyBannerAdComponent style={styles.bannerAd} />
    </View>
    <View style={{ flex: 1 }}>
      {!selectedWorkout && (
        <TouchableOpacity
          onPress={() => setToolPage(null)}
          style={styles.backButton}
        ></TouchableOpacity>
      )}

      {selectedWorkout ? (
        <View style={styles.workoutDetailsContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.backButton}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedWorkout(null)}
              >
                <Image
                  source={BackButton}
                  style={{ width: 35, height: 35 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.editButton}>
              <TouchableOpacity onPress={handleExerciseEditMode}>
                <Image
                  source={editExerciseMode ? Done : EditButton}
                  style={{ width: 35, height: 35, marginBottom: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {isEditingWorkoutName ? (
            <TextInput
              style={styles.workoutName}
              value={selectedWorkout.name}
              onChangeText={(text) =>
                handleWorkoutNameChange(selectedWorkout.id, text)
              }
              placeholder="Enter workout name"
            />
          ) : (
            <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
          )}

          <TouchableOpacity
            onPress={() => setIsEditingWorkoutName(!isEditingWorkoutName)}
          >
            <Image
              source={isEditingWorkoutName ? Done : EditButton}
              style={{ width: 0, height: 0 }}
            />
          </TouchableOpacity>
          {selectedWorkout &&
            selectedWorkout.exercises &&
            selectedWorkout.exercises.map((exercise) =>
              editExerciseMode ? (
                <View style={styles.exercise} key={exercise.id}>
                  <TextInput
                    style={styles.exerciseText}
                    value={exercise.name}
                    onChangeText={(text) =>
                      handleExerciseNameChange(exercise.id, text)
                    }
                    placeholder="Enter exercise name"
                  />
                  <TextInput
                    style={styles.exerciseText}
                    value={exercise.reps}
                    onChangeText={(newReps) =>
                      handleExerciseRepsChange(exercise.id, newReps)
                    }
                    placeholder="Enter reps"
                  />
                  <TextInput
                    style={styles.exerciseText}
                    value={exercise.weight}
                    onChangeText={(newWeight) =>
                      handleExerciseWeightChange(exercise.id, newWeight)
                    }
                    placeholder="Enter weight"
                  />
                </View>
              ) : (
                <Swipeable
                  key={exercise.id}
                  renderRightActions={() =>
                    renderRightAction(exercise.id, "exercise")
                  }
                >
                  <TouchableOpacity
                    onPress={() => toggleCheckExercise(exercise)}
                  >
                    <View style={styles.exercise}>
                      <Text
                        style={[
                          checkedExercises.includes(exercise)
                            ? styles.checked
                            : null,
                          styles.exerciseText,
                        ]}
                      >
                        {exercise.name}
                      </Text>
                      <Text style={styles.exerciseText}>{exercise.reps}</Text>
                      <Text style={styles.exerciseText}>
                        {exercise.weight}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
              )
            )}
          <TouchableOpacity onPress={resetChecks} style={styles.resetButton}>
            <Image source={ResetButton} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          {showAddExercise && (
            <View>
              <TextInput
                placeholder="Exercise Name"
                value={newExerciseName}
                onChangeText={setNewExerciseName}
              />
              <Button title="Add Exercise" onPress={handleAddExercise} />
            </View>
          )}
        </View>
      ) : (
        workouts.map((workout) => (
          <Swipeable
            key={workout.id}
            renderRightActions={() =>
              renderRightAction(workout.id, "workout")
            }
          >
            {editMode ? (
              <TextInput
                style={styles.workout}
                value={editedWorkouts[workout.id] || workout.name}
                onChangeText={(text) =>
                  handleWorkoutNameChange(workout.id, text)
                }
              />
            ) : (
              <TouchableOpacity
                style={styles.workout}
                onPress={() => handleWorkoutClick(workout)}
              >
                <Text style={styles.exerciseText}>{workout.name}</Text>
              </TouchableOpacity>
            )}
          </Swipeable>
        ))
      )}
      {!selectedWorkout && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      )}
      {selectedWorkout && !showAddExercise && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddExercise}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  </GestureHandlerRootView>
);
};

const styles = StyleSheet.create({
  workout: {
    padding: 10,
    borderBottomWidth: 0,
    borderBottomColor: "#ddd",
    backgroundColor: "#232526",
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    color: "white",
  },
  checked: {
    textDecorationLine: "line-through",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
    padding: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  deleteText: {
    color: "#fff",
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    right: 40,
    bottom: 60,
    backgroundColor: "#17b178",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontSize: 30,
  },
  workoutDetailsContainer: {
    padding: 10,
  },
  backButton: {
    left: "-200%",
    top: "60%",
    width: 0, // adjust as needed
    height: 0, // adjust as needed
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    marginBottom: 0,
  },
  editButton: {
    top: "10%", // Adjust as needed
    right: "-200%",
    height: 20, // Adjust as needed
  },
  backButtonText: {
    color: "blue",
  },
  workoutName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    marginTop: 65,
  },
  exercise: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#232526",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    color: "white",
  },
  exerciseText: {
    color: "white",
  },
  doneButton: {
    position: "absolute",
    top: 10, // Adjust as needed
    right: 10,
  },

  resetButton: {
    position: "absolute",
    top: "32.7%", // Adjust as needed
    left: "90%", // Position the left edge to the middle of the screen
    transform: [{ translateX: -10 }], // Shift the button left by half its width
    zIndex: 1,
  },
  buttonContainer: {},
  workoutsContainer: {
    marginTop: 20, // Adjust as needed
    // Other styles...
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: "center", // Centers the ad horizontally
    marginTop: "2%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    left: "50%",
    top: "5%",
    position: "absolute",
  },
  backButton1: {
    position: "absolute",
    top: '2%',
    left: '2%',
  },
});

export default Weightlifting;

/*


 return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#17181a" }}>
      <View style={styles.bannerAd}>
        <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      <View style={{ flex: 1 }}>
        {!selectedWorkout && (
          <TouchableOpacity
            onPress={() => setToolPage(null)}
            style={styles.backButton}
          ></TouchableOpacity>
        )}

        {selectedWorkout ? (
          <View style={styles.workoutDetailsContainer}>
            <View style={styles.buttonContainer}>
              <View style={styles.backButton}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setSelectedWorkout(null)}
                >
                  <Image
                    source={BackButton}
                    style={{ width: 35, height: 35 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.editButton}>
                <TouchableOpacity onPress={handleExerciseEditMode}>
                  <Image
                    source={editExerciseMode ? Done : EditButton}
                    style={{ width: 35, height: 35, marginBottom: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {isEditingWorkoutName ? (
              <TextInput
                style={styles.workoutName}
                value={selectedWorkout.name}
                onChangeText={(text) =>
                  handleWorkoutNameChange(selectedWorkout.id, text)
                }
                placeholder="Enter workout name"
              />
            ) : (
              <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
            )}

            <TouchableOpacity
              onPress={() => setIsEditingWorkoutName(!isEditingWorkoutName)}
            >
              <Image
                source={isEditingWorkoutName ? Done : EditButton}
                style={{ width: 0, height: 0 }}
              />
            </TouchableOpacity>
            {selectedWorkout &&
              selectedWorkout.exercises &&
              selectedWorkout.exercises.map((exercise) =>
                editExerciseMode ? (
                  <View style={styles.exercise} key={exercise.id}>
                    <TextInput
                      style={styles.exerciseText}
                      value={exercise.name}
                      onChangeText={(text) =>
                        handleExerciseNameChange(exercise.id, text)
                      }
                      placeholder="Enter exercise name"
                    />
                    <TextInput
                      style={styles.exerciseText}
                      value={exercise.reps}
                      onChangeText={(newReps) =>
                        handleExerciseRepsChange(exercise.id, newReps)
                      }
                      placeholder="Enter reps"
                    />
                    <TextInput
                      style={styles.exerciseText}
                      value={exercise.weight}
                      onChangeText={(newWeight) =>
                        handleExerciseWeightChange(exercise.id, newWeight)
                      }
                      placeholder="Enter weight"
                    />
                  </View>
                ) : (
                  <Swipeable
                    key={exercise.id}
                    renderRightActions={() =>
                      renderRightAction(exercise.id, "exercise")
                    }
                  >
                    <TouchableOpacity
                      onPress={() => toggleCheckExercise(exercise)}
                    >
                      <View style={styles.exercise}>
                        <Text
                          style={[
                            checkedExercises.includes(exercise)
                              ? styles.checked
                              : null,
                            styles.exerciseText,
                          ]}
                        >
                          {exercise.name}
                        </Text>
                        <Text style={styles.exerciseText}>{exercise.reps}</Text>
                        <Text style={styles.exerciseText}>
                          {exercise.weight}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                )
              )}
            <TouchableOpacity onPress={resetChecks} style={styles.resetButton}>
              <Image source={ResetButton} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            {showAddExercise && (
              <View>
                <TextInput
                  placeholder="Exercise Name"
                  value={newExerciseName}
                  onChangeText={setNewExerciseName}
                />
                <Button title="Add Exercise" onPress={handleAddExercise} />
              </View>
            )}
          </View>
        ) : (
          workouts.map((workout) => (
            <Swipeable
              key={workout.id}
              renderRightActions={() =>
                renderRightAction(workout.id, "workout")
              }
            >
              {editMode ? (
                <TextInput
                  style={styles.workout}
                  value={editedWorkouts[workout.id] || workout.name}
                  onChangeText={(text) =>
                    handleWorkoutNameChange(workout.id, text)
                  }
                />
              ) : (
                <TouchableOpacity
                  style={styles.workout}
                  onPress={() => handleWorkoutClick(workout)}
                >
                  <Text style={styles.exerciseText}>{workout.name}</Text>
                </TouchableOpacity>
              )}
            </Swipeable>
          ))
        )}
        {!selectedWorkout && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        )}
        {selectedWorkout && !showAddExercise && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddExercise}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

*/


/*

return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#17181a" }}>
      <View style={styles.bannerAd}>
        <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      <View style={{ flex: 1 }}>
        {!selectedWorkout && (
          <TouchableOpacity
            onPress={() => setToolPage(null)}
            style={styles.backButton}
          ></TouchableOpacity>
        )}

        {selectedWorkout ? (
          <View style={styles.workoutDetailsContainer}>
            <View style={styles.buttonContainer}>
              <View style={styles.backButton}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setSelectedWorkout(null)}
                >
                  <Image
                    source={BackButton}
                    style={{ width: 35, height: 35 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.editButton}>
                <TouchableOpacity onPress={handleExerciseEditMode}>
                  <Image
                    source={editExerciseMode ? Done : EditButton}
                    style={{ width: 35, height: 35, marginBottom: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {isEditingWorkoutName ? (
              <TextInput
                style={styles.workoutName}
                value={selectedWorkout.name}
                onChangeText={(text) =>
                  handleWorkoutNameChange(selectedWorkout.id, text)
                }
                placeholder="Enter workout name"
              />
            ) : (
              <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
            )}

            <TouchableOpacity
              onPress={() => setIsEditingWorkoutName(!isEditingWorkoutName)}
            >
              <Image
                source={isEditingWorkoutName ? Done : EditButton}
                style={{ width: 0, height: 0 }}
              />
            </TouchableOpacity>
            {selectedWorkout &&
              selectedWorkout.exercises &&
              selectedWorkout.exercises.map((exercise) =>
                editExerciseMode ? (
                  <View style={styles.exercise} key={exercise.id}>
                    <TextInput
                      style={styles.exerciseText}
                      value={exercise.name}
                      onChangeText={(text) =>
                        handleExerciseNameChange(exercise.id, text)
                      }
                      placeholder="Enter exercise name"
                    />
                    <TextInput
                      style={styles.exerciseText}
                      value={exercise.reps}
                      onChangeText={(newReps) =>
                        handleExerciseRepsChange(exercise.id, newReps)
                      }
                      placeholder="Enter reps"
                    />
                    <TextInput
                      style={styles.exerciseText}
                      value={exercise.weight}
                      onChangeText={(newWeight) =>
                        handleExerciseWeightChange(exercise.id, newWeight)
                      }
                      placeholder="Enter weight"
                    />
                  </View>
                ) : (
                  <Swipeable
                    key={exercise.id}
                    renderRightActions={() =>
                      renderRightAction(exercise.id, "exercise")
                    }
                  >
                    <TouchableOpacity
                      onPress={() => toggleCheckExercise(exercise)}
                    >
                      <View style={styles.exercise}>
                        <Text
                          style={[
                            checkedExercises.includes(exercise)
                              ? styles.checked
                              : null,
                            styles.exerciseText,
                          ]}
                        >
                          {exercise.name}
                        </Text>
                        <Text style={styles.exerciseText}>{exercise.reps}</Text>
                        <Text style={styles.exerciseText}>
                          {exercise.weight}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                )
              )}
            <TouchableOpacity onPress={resetChecks} style={styles.resetButton}>
              <Image source={ResetButton} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            {showAddExercise && (
              <View>
                <TextInput
                  placeholder="Exercise Name"
                  value={newExerciseName}
                  onChangeText={setNewExerciseName}
                />
                <Button title="Add Exercise" onPress={handleAddExercise} />
              </View>
            )}
          </View>
        ) : (
          workouts.map((workout) => (
            <Swipeable
              key={workout.id}
              renderRightActions={() =>
                renderRightAction(workout.id, "workout")
              }
            >
              {editMode ? (
                <TextInput
                  style={styles.workout}
                  value={editedWorkouts[workout.id] || workout.name}
                  onChangeText={(text) =>
                    handleWorkoutNameChange(workout.id, text)
                  }
                />
              ) : (
                <TouchableOpacity
                  style={styles.workout}
                  onPress={() => handleWorkoutClick(workout)}
                >
                  <Text style={styles.exerciseText}>{workout.name}</Text>
                </TouchableOpacity>
              )}
            </Swipeable>
          ))
        )}
        {!selectedWorkout && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        )}
        {selectedWorkout && !showAddExercise && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddExercise}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </GestureHandlerRootView>
  );
};



*/