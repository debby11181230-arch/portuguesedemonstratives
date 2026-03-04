/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Pencil, 
  Star,
  Info,
  RotateCcw,
  MapPin
} from 'lucide-react';

// Pokemon IDs for visual aids
const POKEMON = {
  PIKACHU: 25,
  BULBASAUR: 1,
  CHARMANDER: 4,
  SQUIRTLE: 7,
  EEVEE: 133,
  MEW: 151
};

const getPokemonImg = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const SECTION_1_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "當皮卡丘就在你腳邊（靠近說話者）時，你應該說：",
    options: ["Este Pikachu", "Esse Pikachu", "Aquele Pikachu"],
    correctAnswer: 0,
    explanation: "Este 用於靠近說話者（我）的東西。就像皮卡丘就在你懷裡一樣！"
  },
  {
    id: 2,
    text: "當傑尼龜在你的朋友（聽話者）身邊時，你應該說：",
    options: ["Esta Squirtle", "Essa Squirtle", "Aquela Squirtle"],
    correctAnswer: 1,
    explanation: "Essa 用於靠近聽話者（你對面的人）的東西。傑尼龜在朋友那邊喔！"
  },
  {
    id: 3,
    text: "遠處山頭有一隻小火龍，離你和朋友都很遠，該說：",
    options: ["Este Charmander", "Esse Charmander", "Aquele Charmander"],
    correctAnswer: 2,
    explanation: "Aquele 用於遠離雙方的東西。小火龍在好遠好遠的地方！"
  }
];

const SECTION_2_QUESTIONS: Question[] = [
  {
    id: 4,
    text: "你想問「這是什麼？」（指著自己手裡神祕的東西），該說：",
    options: ["O que é isso?", "O que é isto?", "O que é aquilo?"],
    correctAnswer: 1,
    explanation: "Isto 指靠近說話者的不特定東西。因為在你自己手裡，所以用 isto！"
  },
  {
    id: 5,
    text: "朋友剛說了一件讓你驚訝的事，你想說「那件事太棒了！」，該用：",
    options: ["Isto foi incrível!", "Isso foi incrível!", "Aquilo foi incrível!"],
    correctAnswer: 1,
    explanation: "Isso 指代聽話者剛說過的話或發生的事。因為是朋友說的，所以用 isso！"
  }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowFeedback(prev => ({ ...prev, [questionId]: true }));
  };

  const steps = [
    // Step 0: Intro
    {
      title: "歡迎來到蠟筆葡語教室！",
      content: (
        <div className="space-y-6 text-center">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex justify-center"
          >
            <img 
              src={getPokemonImg(POKEMON.PIKACHU)} 
              alt="Pikachu" 
              className="w-56 h-56 drop-shadow-[10px_10px_0px_rgba(255,200,0,0.3)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="crayon-card text-orange-600 border-orange-400 bg-orange-50/30">
            <h2 className="text-3xl font-display mb-4">今天的主角：指示代詞 (Demonstrativos)</h2>
            <p className="text-xl font-crayon leading-relaxed">
              哈囉！小訓練家們！在葡萄牙語裡，要說「這個」還是「那個」，
              全看東西離你有多遠喔！就像我們在畫畫時，蠟筆是在你手裡、在朋友桌上，還是在遠處的架子上呢？
              讓我們跟著寶可夢一起學習吧！
            </p>
          </div>
        </div>
      )
    },
    // Step 1: Basic Near/Mid/Far
    {
      title: "1. 距離的秘密 (Segredos da Distância)",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="crayon-card text-blue-600 border-blue-400 bg-blue-50/30">
              <div className="flex items-center gap-4">
                <img src={getPokemonImg(POKEMON.SQUIRTLE)} alt="Near" className="w-24 h-24" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    <MapPin size={24} /> 近 (Aqui / Perto de mim)
                  </h3>
                  <p className="text-lg opacity-80 mb-2">就在說話者（我）的身邊，手摸得到的地方！</p>
                  <div className="grid grid-cols-2 gap-2 font-bold text-xl">
                    <span className="bg-white/50 px-2 py-1 rounded">este / esta → 這個</span>
                    <span className="bg-white/50 px-2 py-1 rounded">estes / estas → 這些</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="crayon-card text-green-600 border-green-400 bg-green-50/30">
              <div className="flex items-center gap-4">
                <img src={getPokemonImg(POKEMON.BULBASAUR)} alt="Mid" className="w-24 h-24" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    <MapPin size={24} /> 稍遠 (Aí / Perto de ti)
                  </h3>
                  <p className="text-lg opacity-80 mb-2">在聽話者（你）的身邊，離我有一點距離。</p>
                  <div className="grid grid-cols-2 gap-2 font-bold text-xl">
                    <span className="bg-white/50 px-2 py-1 rounded">esse / essa → 那個</span>
                    <span className="bg-white/50 px-2 py-1 rounded">esses / essas → 那些</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="crayon-card text-red-600 border-red-400 bg-red-50/30">
              <div className="flex items-center gap-4">
                <img src={getPokemonImg(POKEMON.CHARMANDER)} alt="Far" className="w-24 h-24" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    <MapPin size={24} /> 遠 (Ali / Longe de nós)
                  </h3>
                  <p className="text-lg opacity-80 mb-2">離我們兩個人都很遠，要用手指指很遠的地方！</p>
                  <div className="grid grid-cols-2 gap-2 font-bold text-xl">
                    <span className="bg-white/50 px-2 py-1 rounded">aquele / aquela → 那個</span>
                    <span className="bg-white/50 px-2 py-1 rounded">aqueles / aquelas → 那些</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="crayon-card text-indigo-600 border-indigo-400 bg-white">
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen size={24} /> 📚 例句對照 (Exemplos)
            </h4>
            <div className="space-y-4 text-xl font-crayon">
              <div className="p-3 bg-indigo-50 rounded-lg border-2 border-dashed border-indigo-200">
                <p className="font-bold">Esta mochila é tua? (近)</p>
                <p className="text-gray-600">這個書包是你的嗎？</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg border-2 border-dashed border-indigo-200">
                <p className="font-bold">Essa mochila é minha. (稍遠)</p>
                <p className="text-gray-600">那個書包是我的。</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg border-2 border-dashed border-indigo-200">
                <p className="font-bold">Aquele lápis é teu? (遠)</p>
                <p className="text-gray-600">那支鉛筆是你的嗎？</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Step 2: Practice 1
    {
      title: "📝 練習題：第一回合 (Exercícios 1)",
      content: (
        <div className="space-y-8">
          {SECTION_1_QUESTIONS.map((q) => (
            <div key={q.id} className="crayon-card text-slate-700 border-slate-300">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="bg-yellow-400 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl crayon-border border-yellow-600">{q.id}</span>
                {q.text}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(q.id, idx)}
                    disabled={showFeedback[q.id]}
                    className={`sketch-button text-xl ${
                      answers[q.id] === idx 
                        ? (idx === q.correctAnswer ? 'bg-green-100 text-green-700 border-green-500' : 'bg-red-100 text-red-700 border-red-500')
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'
                    } ${showFeedback[q.id] && idx === q.correctAnswer ? 'border-green-500 bg-green-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showFeedback[q.id] && idx === q.correctAnswer && <CheckCircle2 className="text-green-500" />}
                      {showFeedback[q.id] && answers[q.id] === idx && idx !== q.correctAnswer && <XCircle className="text-red-500" />}
                    </div>
                  </button>
                ))}
              </div>
              {showFeedback[q.id] && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-yellow-50 rounded-xl border-2 border-dashed border-yellow-300 text-yellow-800 flex items-start gap-2 text-lg">
                  <Info className="shrink-0 mt-1" size={20} />
                  <p>{q.explanation}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )
    },
    // Step 3: Neutral Demonstratives
    {
      title: "📘 什麼是 isto / isso / aquilo？ (Invariáveis)",
      content: (
        <div className="space-y-6">
          <div className="flex justify-center">
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              src={getPokemonImg(POKEMON.EEVEE)} 
              alt="Eevee" 
              className="w-44 h-44 drop-shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="crayon-card text-purple-600 border-purple-400 bg-purple-50/30">
            <p className="text-2xl font-crayon mb-4">
              它們表示<strong>「這個／那個（不特定）」</strong>的概念，最重要的是：<strong>它們不接名詞！</strong>
            </p>
            <div className="space-y-3 font-bold text-xl">
              <div className="bg-white/60 p-3 rounded-xl border-2 border-dashed border-purple-200">
                <strong>isto</strong> → 這個 (靠近我) <span className="text-gray-400 text-lg font-normal">| Isto é meu. (這是我的)</span>
              </div>
              <div className="bg-white/60 p-3 rounded-xl border-2 border-dashed border-purple-200">
                <strong>isso</strong> → 那個 (靠近你) <span className="text-gray-400 text-lg font-normal">| Isso é teu. (那是你的)</span>
              </div>
              <div className="bg-white/60 p-3 rounded-xl border-2 border-dashed border-purple-200">
                <strong>aquilo</strong> → 那個 (好遠) <span className="text-gray-400 text-lg font-normal">| O que é aquilo? (那邊那是啥？)</span>
              </div>
            </div>
          </div>

          <div className="crayon-card text-pink-600 border-pink-400 bg-white">
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star size={24} className="text-yellow-500" /> 什麼時候用？ (Quando usar?)
            </h4>
            <div className="space-y-6 text-xl font-crayon">
              <div className="p-4 bg-pink-50 rounded-xl border-2 border-pink-100">
                <h5 className="font-bold mb-2">1. 指不確定的東西 (Coisas incertas)</h5>
                <p><strong>O que é isto?</strong> → 這是什麼？ (就在我手裡)</p>
                <p><strong>O que é isso?</strong> → 那是什麼？ (在你桌上)</p>
                <p><strong>O que é aquilo?</strong> → 那邊那個是什麼？ (在遠方)</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-xl border-2 border-pink-100">
                <h5 className="font-bold mb-2">2. 指整件事情 (Ações / Ideias)</h5>
                <p><strong>Isto é importante.</strong> → 這件事很重要。</p>
                <p><strong>Não digas isso!</strong> → 別說那種話！ (你剛說的話)</p>
                <p><strong>Aquilo foi incrível!</strong> → 那件事太棒了！ (很久以前或遠處發生的)</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Step 4: Difference Table
    {
      title: "📝 差別在哪裡？ (Qual a diferença?)",
      content: (
        <div className="space-y-6">
          <div className="crayon-card border-slate-400 p-0 overflow-hidden">
            <div className="bg-slate-700 text-white p-4 grid grid-cols-3 font-bold text-xl">
              <div>類型 (Tipo)</div>
              <div>用法 (Uso)</div>
              <div>例子 (Exemplo)</div>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 text-lg items-center border-b border-slate-100">
              <div className="font-bold text-blue-600">este / essa / aquele</div>
              <div className="text-gray-600">要跟<strong>名詞</strong>一起用</div>
              <div className="italic text-sm">este livro / essa mochila</div>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 text-lg items-center">
              <div className="font-bold text-purple-600">isto / isso / aquilo</div>
              <div className="text-gray-600"><strong>單獨使用</strong>，指代事情</div>
              <div className="italic text-sm">isto é bom / o que é isso?</div>
            </div>
          </div>
          
          <div className="crayon-card text-emerald-600 border-emerald-400 bg-emerald-50/30 flex items-center gap-6">
            <img src={getPokemonImg(POKEMON.MEW)} alt="Mew" className="w-24 h-24" referrerPolicy="no-referrer" />
            <div>
              <h4 className="text-2xl font-bold mb-2">💡 老師的小補充</h4>
              <p className="text-xl font-crayon">
                如果你知道東西的名字（如：書、筆），就用 <strong>este/esse/aquele</strong>。<br />
                如果你不知道那是甚麼，或者是在講「一件事」，就用 <strong>isto/isso/aquilo</strong>！
              </p>
            </div>
          </div>
        </div>
      )
    },
    // Step 5: Practice 2
    {
      title: "📝 練習題：第二回合 (Exercícios 2)",
      content: (
        <div className="space-y-8">
          {SECTION_2_QUESTIONS.map((q) => (
            <div key={q.id} className="crayon-card text-slate-700 border-slate-300">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl crayon-border border-purple-700">{q.id}</span>
                {q.text}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(q.id, idx)}
                    disabled={showFeedback[q.id]}
                    className={`sketch-button text-xl ${
                      answers[q.id] === idx 
                        ? (idx === q.correctAnswer ? 'bg-green-100 text-green-700 border-green-500' : 'bg-red-100 text-red-700 border-red-500')
                        : 'bg-white text-slate-600 border-slate-200 hover:border-purple-400'
                    } ${showFeedback[q.id] && idx === q.correctAnswer ? 'border-green-500 bg-green-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showFeedback[q.id] && idx === q.correctAnswer && <CheckCircle2 className="text-green-500" />}
                      {showFeedback[q.id] && answers[q.id] === idx && idx !== q.correctAnswer && <XCircle className="text-red-500" />}
                    </div>
                  </button>
                ))}
              </div>
              {showFeedback[q.id] && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-purple-50 rounded-xl border-2 border-dashed border-purple-300 text-purple-800 flex items-start gap-2 text-lg">
                  <Info className="shrink-0 mt-1" size={20} />
                  <p>{q.explanation}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )
    },
    // Step 6: Final Summary
    {
      title: "🎯 學習大總結 (Resumo Final)",
      content: (
        <div className="space-y-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="crayon-card text-blue-600 border-blue-400 bg-blue-50/50">
              <h3 className="text-2xl font-bold mb-2">este / esta</h3>
              <div className="hand-drawn-line mb-2" />
              <p className="text-2xl font-display">近 (Aqui)</p>
              <p className="text-lg">就在我身邊</p>
            </div>
            <div className="crayon-card text-green-600 border-green-400 bg-green-50/50">
              <h3 className="text-2xl font-bold mb-2">esse / essa</h3>
              <div className="hand-drawn-line mb-2" />
              <p className="text-2xl font-display">稍遠 (Aí)</p>
              <p className="text-lg">在你身邊</p>
            </div>
            <div className="crayon-card text-red-600 border-red-400 bg-red-50/50">
              <h3 className="text-2xl font-bold mb-2">aquele / aquela</h3>
              <div className="hand-drawn-line mb-2" />
              <p className="text-2xl font-display">遠 (Ali)</p>
              <p className="text-lg">離我們都很遠</p>
            </div>
          </div>
          
          <div className="crayon-card text-purple-700 border-purple-500 bg-purple-50 p-10">
            <h3 className="text-3xl font-bold mb-4">isto / isso / aquilo</h3>
            <p className="text-2xl font-display mb-2">不特定（中性）</p>
            <p className="text-xl">不接名詞，單獨使用！</p>
            <p className="mt-4 text-lg opacity-70 italic">「這件事、那個東西、那種情況」</p>
          </div>

          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block bg-yellow-400 text-white px-10 py-5 rounded-full font-bold text-2xl shadow-xl crayon-border border-yellow-600 flex items-center gap-3 mx-auto"
          >
            <Star fill="white" size={32} /> 訓練家等級提升！
          </motion.div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen paper-texture pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-4 border-dashed border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-400 p-3 rounded-2xl crayon-border border-orange-600">
              <Pencil className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-display text-slate-800">蠟筆葡語教室</h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg font-crayon font-bold text-slate-500">
              進度: {currentStep + 1} / {steps.length}
            </span>
            <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <motion.div 
                className="h-full bg-orange-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, rotate: -1 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-display text-indigo-600 mb-4">{steps[currentStep].title}</h2>
              <div className="hand-drawn-line text-indigo-300 max-w-xs mx-auto" />
            </div>

            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t-4 border-dashed border-slate-200 p-5 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`sketch-button flex items-center gap-2 text-xl ${
              currentStep === 0 
                ? 'text-slate-300 border-slate-100 cursor-not-allowed' 
                : 'text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft size={24} /> 上一步
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="sketch-button flex items-center gap-2 text-xl bg-indigo-600 text-white border-indigo-800 shadow-lg hover:bg-indigo-700"
            >
              下一步 <ChevronRight size={24} />
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
                setShowFeedback({});
              }}
              className="sketch-button flex items-center gap-2 text-xl bg-emerald-600 text-white border-emerald-800 shadow-lg hover:bg-emerald-700"
            >
              重新開始 <RotateCcw size={24} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
