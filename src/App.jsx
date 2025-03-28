import { useState } from "react";
import { Button } from "./components/Button";
import { Card, CardContent } from "./components/Card";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const questions = [
  {
    id: 1,
    type: "mcq",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    type: "dragdrop",
    question: "Drag the correct number into the box: 5 + 3 = ?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    id: 3,
    type: "mcq",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 2,
    type: "dragdrop",
    question: "Drag the correct number into the box: 10 + 25 = ?",
    options: ["40", "28", "35", "62"],
    answer: "35",
  }
];

export default function QuizApp() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const handleMCQChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleDrop = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCurrentQuestion((prev) => (prev + 1 < questions.length ? prev + 1 : 0));
    }, 2000);
  };


  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
    <div className="max-w-lg w-full">
    <p className="mb-5 text-center font-bold text-white text-2xl">TOP MARCHANT QUIZ</p>
      <Card className="p-6">
        <CardContent>
          <p className="font-semibold mb-2">{questions[currentQuestion].question}</p>
          {questions[currentQuestion].type === "mcq" ? (
            <div className="space-y-2">
              {questions[currentQuestion].options.map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name={`question-${questions[currentQuestion].id}`}
                    value={opt}
                    onChange={() => handleMCQChange(questions[currentQuestion].id, opt)}
                    disabled={submitted}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <DndContext onDragEnd={(event) => handleDrop(questions[currentQuestion].id, event.active.id)}>
              <DroppableBox id={`drop-${questions[currentQuestion].id}`} answer={answers[questions[currentQuestion].id]} submitted={submitted} />
              <div className="flex gap-2 mt-4">
                {questions[currentQuestion].options.map((opt) => (
                  <DraggableItem key={opt} id={opt} />
                ))}
              </div>
            </DndContext>
          )}
          {submitted && (
            <p className={`mt-2 font-bold ${answers[questions[currentQuestion].id] === questions[currentQuestion].answer ? "text-green-600" : "text-red-600"}`}>
              {answers[questions[currentQuestion].id] === questions[currentQuestion].answer ? "Correct!" : "Incorrect"}
            </p>
          )}
        </CardContent>
      </Card>
      
      <Button onClick={handleSubmit} disabled={submitted} className="mt-4 w-full cursor-pointer">
        Submit
      </Button>
      </div>
    </div>
  );
}

function DraggableItem({ id }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
    >
      {id}
    </div>
  );
}


function DroppableBox({ id, answer, submitted }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="w-24 h-12 border-2 border-dashed flex items-center justify-center"
    >
      {answer || "Drop here"}
    </div>
  );
}
