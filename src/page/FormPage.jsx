import React, { useState, useEffect } from "react";
import questions from "../../utils/data";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loggedUser, setLoggedUser] = useState("");
  const [isLoading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setLoggedUser(JSON.parse(getUser));
    }
  }, []);

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    const dataToSend = {
      name: loggedUser.name,
      email: loggedUser.email,
      question1: responses[1] || "",
      question2: responses[2] || "",
      question3: responses[3] || "",
      question4: responses[4] || "",
      question5: responses[5] || "",
      question6: responses[6] || "",
      question7: responses[7] || "",
      question8: responses[8] || "",
      question9: responses[9] || "",
      question10: responses[10] || ""
    };
    console.log("datasend", dataToSend);
    // return
    try {
      const response = await fetch("https://sheetdb.io/api/v1/ftdo91gp1xfc2", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: dataToSend
        })
      });

      const result = await response.json();
      if (result) {
        setLoading(false);
        setTimeout(() => {
          navigate('/thank');
        }, 1500);
      }
     
      console.log("Data appended:", result);
    } catch (error) {
      console.error("Error appending data:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-custom-image py-12 px-4 sm:px-6 lg:px-8"
{/*       style={{ backgroundImage: "url('../../src/assets/willoberry.jpg')" }} */}
    >
      <div className="max-w-md mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6 ">
            <div className="rounded ">
              <img
                src={currentQuestion.image}
                alt={`Question ${currentQuestion.id}`}
                className="w-full h-[14rem] object-contain aspect-square rounded-lg mb-6"
              />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">{currentQuestion.text}</h2>
            <div className="space-y-4">
              {["yes", "no"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-green-100 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    name={`question_${currentQuestion.id}`}
                    value={option}
                    checked={responses[currentQuestion.id] === option}
                    onChange={() => handleResponse(currentQuestion.id, option)}
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <span className="text-gray-700 font-medium capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            {currentQuestionIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition-colors"
              >
                Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!responses[currentQuestion.id]}
                className={`${
                  responses[currentQuestion.id]
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-400 cursor-not-allowed"
                } text-white font-bold py-2 px-6 rounded-full transition-colors`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!responses[currentQuestion.id] || isLoading}
                className={`${
                  responses[currentQuestion.id]
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-yellow-300 cursor-not-allowed"
                } text-white font-bold py-2 px-6 rounded-full transition-colors`}
              >
                {isLoading ? "Submitting" : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
