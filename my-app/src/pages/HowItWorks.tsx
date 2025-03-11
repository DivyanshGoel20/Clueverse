import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen py-12 px-6 max-w-3xl mx-auto text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-800/40 z-[-1]" />
      
      <h1 className="text-4xl font-bold mb-8 text-center">🧠 How Clueverse Works</h1>

      <p className="mb-6 text-lg leading-relaxed">
        Clueverse is an interactive on-chain puzzle platform where your brainpower meets blockchain.
        Players explore a growing set of handcrafted puzzles — from logic and clues to hidden patterns.
      </p>

      <ul className="list-disc list-inside mb-6 space-y-4 text-md">
        <li><strong>Connect your wallet</strong> to get started on the Core Testnet.</li>
        <li>Browse through the puzzle collection and pick one that challenges you.</li>
        <li><strong>Click "Start Challenge"</strong> to reveal the puzzle and input box.</li>
        <li><strong>Enter your answer</strong> and submit it by paying <span className="text-purple-300 font-semibold">1 CORE token</span>.</li>
        <li>If your answer is correct:
          <ul className="ml-6 list-disc text-green-400">
            <li>The puzzle will be marked as ✅ Solved</li>
            <li>You’ll receive a special <strong>NFT reward</strong></li>
          </ul>
        </li>
        <li>If the answer is wrong, the token is used up and you can try again by paying 1 CORE again.</li>
        <li><strong>Every puzzle is case-sensitive</strong> — so type your answer carefully!</li>
      </ul>

      <div className="text-center">
        <Link
          to="/puzzles"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
        >
          🧩 Start Solving
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
