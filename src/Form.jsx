import React,{useState} from 'react'

const Form = () => {
    const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      text: "Did you enjoy our product?",
      image: "https://i.pravatar.cc/300"
    },
    {
      id: 2,
      text: "Was the customer service helpful?",
      image: "https://i.pravatar.cc/200"
    },
    {
      id: 3,
      text: "Would you recommend us to a friend?",
      image: "url_to_recommendation_image.jpg"
    }
  ];

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey responses:", responses);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-8">
            <img 
              src={currentQuestion.image} 
              alt={`Question ${currentQuestion.id}`} 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentQuestion.text}</h2>
            <div className="space-y-4">
              {['yes', 'no'].map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question_${currentQuestion.id}`}
                    value={option}
                    checked={responses[currentQuestion.id] === option}
                    onChange={() => handleResponse(currentQuestion.id, option)}
                    className="form-radio h-5 w-5 text-indigo-600"
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
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
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-indigo-400 cursor-not-allowed'
                } text-white font-bold py-2 px-4 rounded-r`}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit"
                disabled={!responses[currentQuestion.id]}
                className={`${
                  responses[currentQuestion.id]
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-green-400 cursor-not-allowed'
                } text-white font-bold py-2 px-4 rounded-r`}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form