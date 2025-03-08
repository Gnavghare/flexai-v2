import { useState } from "react";
import Header from "../../components/Header";
import { ExerciseIntro } from "../../components/Intro";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import toast from "react-hot-toast";
import MarkdownIt from "markdown-it";
import { BiSolidSend } from "react-icons/bi";
import { IoNavigate } from "react-icons/io5";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
import { useRouter } from "next/router"; // Import useRout
export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [textInput, setTextInput] = useState("");
  const [output, setOutput] = useState("");
  const router = useRouter(); // Initialize useRouter
  const imageAnalysisPrompt = `
  Analyze the uploaded image and determine the fitness level, body type, or health-related characteristics of the person. Based on the additional input provided: "${textInput}", generate a comprehensive response that includes:
  
  1. A personalized diet plan tailored to their fitness level and goals.
  2. Key nutrition tips to enhance health and performance.
  3. Recommended workout routines suitable for their body type or goals.
  4. Motivational strategies to help them stay consistent and inspired.
  5. General health tips, such as hydration, sleep, and stress management.
  6. Any additional recommendations or guidance relevant to the image analysis and input.
  `;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
          setSelectedImage(reader.result);
        };
        reader.onerror = reject;
      });
      setImageBase64(base64);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleGenerate = async () => {
    if (!imageBase64) {
      toast.error("Please upload an image.");
      return;
    }
    if (!textInput) {
      toast.error("Please enter a prompt.");
      return;
    }
    console.log("called generater");

    setOutput(""); // Clear previous output
    try {
      setLoading(true);
      const contents = [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            { text: imageAnalysisPrompt },
          ],
        },
      ];

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const result = await model.generateContentStream({ contents });

      const md = new MarkdownIt();
      let buffer = [];
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(md.render(buffer.join("")));
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col min-h-screen bg-black">
      <div
        className={"w-full flex-grow"}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className={"mt-24 px-4 my-6"}>
          <div className={"max-w-5xl p-4 mx-auto bg-black/60"}>
            <ExerciseIntro />
            <div className={"w-full"}>
              <div className="flex-1 flex-row items-end justify-end">
                <div className="mt-6 flex items-center justify-between gap-x-6">
                  <div
                    className={
                      "flex justify-center items-center gap-2 text-white text-xl  font-bold"
                    }
                  >
                    Generate Diet Plan
                  </div>
                  <button
                    type="submit"
                    onClick={() => router.push("/diet")}
                    disabled={loading}
                    className="rounded-md bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <div className={"flex justify-center items-center gap-2"}>
                      Generate Diet Plan <IoNavigate />
                    </div>
                  </button>
                </div>
                <div></div>
              </div>
              <hr className={"my-5"} />
              <div className="p-4">
                {/* Image Upload */}
                <div className="mb-4">
                  <label className="cursor-pointer p-2 bg-gradient-to-r text-white  text-transparent font-bold text-lg  hover:bg-white/80 hover:text-black/80 rounded-md  bg-black/50">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {selectedImage && (
                  <div className="mt-4 md:mt-0">
                    <p className="text-white text-sm mb-2">Preview:</p>

                    <img
                      src={selectedImage}
                      alt="Uploaded Preview"
                      className="w-64 h-64 object-cover rounded-lg shadow-md border"
                    />
                  </div>
                )}
                {/* Text Input */}
                <div className="mb-4">
                  <label
                    className="block font-semibold mb-2 text-white"
                    htmlFor="textInput"
                  >
                    Ask me :
                  </label>
                  <textarea
                    id="textInput"
                    rows="4"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full border  px-2 py-1  rounded-md p-1 ring-1 ring-inset ring-primary-light"
                  ></textarea>
                </div>

                {/* Generate Button */}

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    onClick={handleGenerate}
                    disabled={loading}
                    className="rounded-md bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? (
                      "Generating..."
                    ) : (
                      <div className={"flex justify-center items-center gap-2"}>
                        Generate <BiSolidSend />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${output ? "mt-16 px-14 my-6" : ""}`}>
        {output && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-white">Output:</h2>
            <div
              id="output"
              className="border p-4 bg-gray-100 rounded-md  ring-1 ring-inset ring-primary-light"
              dangerouslySetInnerHTML={{ __html: output }}
            ></div>
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg ">
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
