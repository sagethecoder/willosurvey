import React, { useState, useEffect } from "react";
import questions from "../../utils/data";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loggedUser, setLoggedUser] = useState("");
  const [isLoading, setLoading] = useState(null);
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    region: "",
    territory: "",
    farmer_name: "",
    contact: "",
    area_of_soybean: "",
    patro_qty: "",
    date_of_sowing: "",
    date_of_app: "",
    field_moist: "",
    area_patromax:"",
    pump_size:"",
    oneacre_pump:"",
    onepump_patromax:"",
    soyabean:"",
    soyabean_boni:"",
    patromax_usage:""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setLoggedUser(JSON.parse(getUser));
    }
  }, []);

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    if (name == "contact") {
      const regex = /^[0-9\b]{0,10}$/;
      if (value === "" || regex.test(value)) {
        setBasicInfo((prevInfo) => ({
          ...prevInfo,
          [name]: value
        }));
      }
    } else {
      setBasicInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value
      }));
    }
  };

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex === 0) {
      if (
        basicInfo.name &&
        basicInfo.territory &&
        basicInfo.region &&
        basicInfo.farmer_name &&
        basicInfo.contact &&
        basicInfo.area_of_soybean &&
        basicInfo.patro_qty &&
        basicInfo.date_of_sowing &&
        basicInfo.date_of_app &&
        basicInfo.field_moist &&
        basicInfo.area_patromax &&
        basicInfo.pump_size &&
        basicInfo.oneacre_pump &&
        basicInfo.onepump_patromax &&
        basicInfo.soyabean &&
        basicInfo.soyabean_boni &&
        basicInfo.patromax_usage 
      ) {
        setCurrentQuestionIndex(1);
      } else {
        toast.error("Please fill all basic information fields");
      }
    } else if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex - 1];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const dataToSend = {
      name: basicInfo.name,
      region: basicInfo.region,
      territory: basicInfo.territory,
      farmerName: basicInfo.farmer_name,
      contact: basicInfo.contact,
      area_of_soybean: basicInfo.area_of_soybean,
      patro_qty: basicInfo.patro_qty,
      date_of_sowing: basicInfo.date_of_sowing,
      date_of_app: basicInfo.date_of_app,
      field_moist: basicInfo.field_moist,
      area_patromax: basicInfo.area_patromax,
      pump_size: basicInfo.pump_size,
      oneacre_pump: basicInfo.oneacre_pump,
      onepump_patromax: basicInfo.onepump_patromax,
      soyabean: basicInfo.soyabean,
      soyabean_boni: basicInfo.soyabean_boni,
      patromax_usage: basicInfo.patromax_usage,
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
          navigate("/thank");
        }, 1500);
      }

      console.log("Data appended:", result);
    } catch (error) {
      console.error("Error appending data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-custom-image py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="max-w-md mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <form onSubmit={handleSubmit} className="p-8">
          {currentQuestionIndex === 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={basicInfo.name}
                  onChange={handleBasicInfoChange}
                  placeholder="Name of Willowood Employee"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="region"
                  value={basicInfo.region}
                  onChange={handleBasicInfoChange}
                  placeholder="Region"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="territory"
                  value={basicInfo.territory}
                  onChange={handleBasicInfoChange}
                  placeholder="Territory"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="farmer_name"
                  value={basicInfo.farmer_name}
                  onChange={handleBasicInfoChange}
                  placeholder="Farmer Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="tel"
                  name="contact"
                  maxLength={10}
                  value={basicInfo.contact}
                  onChange={handleBasicInfoChange}
                  placeholder="Contact"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="area_of_soybean"
                  value={basicInfo.area_of_soybean}
                  onChange={handleBasicInfoChange}
                  placeholder="Area of Soybean"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="patro_qty"
                  value={basicInfo.patro_qty}
                  onChange={handleBasicInfoChange}
                  placeholder="Patromax purchased qty"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Sowing</label>
                  <input
                    type="date"
                    name="date_of_sowing"
                    value={basicInfo.date_of_sowing}
                    onChange={handleBasicInfoChange}
                    placeholder="Date of Sowing"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Application</label>
                  <input
                    type="date"
                    name="date_of_app"
                    value={basicInfo.date_of_app}
                    onChange={handleBasicInfoChange}
                    placeholder="Date of Application"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Field Moisture</label>
                  <select
                    name="field_moist"
                    id=""
                    className="p-2 bg-white"
                    value={basicInfo.field_moist}
                    onChange={handleBasicInfoChange}
                  >
                    <option value="">-- select --</option>
                    <option value="less">Less</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <label className="block text-sm font-medium text-gray-700">कितने एरिया में पैट्रोमैक्स इस्तेमाल किया ?</label>
                <input
                  type="text"
                  name="area_patromax"
                  value={basicInfo.area_patromax}
                  onChange={handleBasicInfoChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              </div>
            </div>
          )}

          {currentQuestionIndex > 0 && (
            <div className="mb-6">
              <div className="rounded">
                <img
                  src={currentQuestion.image}
                  alt={Question ${currentQuestion.id}}
                  className="w-full h-[14rem] object-contain aspect-square rounded-lg mb-6"
                />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">{currentQuestion.text}</h2>
              <div className="space-y-4">
                {["हाँ ", "नहीं ", "खेत में नहीं है"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-green-100 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name={question_${currentQuestion.id}}
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
          )}

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
            {currentQuestionIndex < questions.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentQuestionIndex > 0 && !responses[currentQuestion.id]}
                className={`${
                  currentQuestionIndex === 0 || responses[currentQuestion.id]
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