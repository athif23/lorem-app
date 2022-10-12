import { appWindow } from "@tauri-apps/api/window";
import { register } from "@tauri-apps/api/globalShortcut";
import { createSignal } from "solid-js";
import { LoremIpsum } from "lorem-ipsum";
import { writeText } from "@tauri-apps/api/clipboard";

const [result, setResult] = createSignal("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");

await register("CommandOrControl+Shift+L", async () => {
  writeText(result());
});

function App() {
  const UNITS = ["word", "sentence", "paragraph"];
  const [unit, setUnit] = createSignal(0);
  const [wordNum, setWordNum] = createSignal(20);
  const [sentenceNum, setSentenceNum] = createSignal(5);
  const [paragraphNum, setParagraphNum] = createSignal(2);

  const [paragraphLowerBound, setParagraphLowerBound] = createSignal(3);
  const [paragraphUpperBound, setParagraphUpperBound] = createSignal(7);

  const [sentenceLowerBound, setsentenceLowerBound] = createSignal(5);
  const [sentenceUpperBound, setsentenceUpperBound] = createSignal(15);

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: paragraphUpperBound(),
      min: paragraphLowerBound(),
    },
    wordsPerSentence: {
      max: sentenceUpperBound(),
      min: sentenceLowerBound(),
    },
  });

  function generateLorem() {
    switch (UNITS[unit()]) {
      case "word": {
        setResult(lorem.generateWords(wordNum()));
        break;
      }
      case "sentence": {
        setResult(lorem.generateSentences(sentenceNum()));
        break;
      }
      case "paragraph": {
        setResult(lorem.generateParagraphs(paragraphNum()));
        break;
      }
    }
  }

  function saveToClipboard() {
    writeText(result()).then(console.log);
  }

  function changeNumber(evt) {
    const value = +evt.target.value;
    switch (UNITS[unit()]) {
      case "word": {
        setWordNum(value);
        break;
      }
      case "sentence": {
        setSentenceNum(value);
        break;
      }
      case "paragraph": {
        setParagraphNum(value);
        break;
      }
    }
  }

  function changeUnit(evt) {
    setUnit(evt.target.value);
  }

  return (
    <div class="h-screen w-full bg-white">
      <div class="w-full flex justify-between py-2 px-3" data-tauri-drag-region>
        <h1 class="text-xs font-bold font-inria text-[#363636] flex items-center">
          Lorem Ipsum Generator
        </h1>
        <div class="h-full flex gap-[8px]">
          <button class="mr-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2_85)">
                <path
                  d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z"
                  stroke="#383838"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.3167 8.75C11.239 8.92594 11.2159 9.12111 11.2502 9.31034C11.2845 9.49957 11.3747 9.67419 11.5092 9.81167L11.5442 9.84667C11.6526 9.95502 11.7387 10.0837 11.7974 10.2253C11.8561 10.367 11.8863 10.5188 11.8863 10.6721C11.8863 10.8254 11.8561 10.9772 11.7974 11.1188C11.7387 11.2605 11.6526 11.3891 11.5442 11.4975C11.4358 11.606 11.3071 11.692 11.1655 11.7507C11.0239 11.8094 10.8721 11.8397 10.7188 11.8397C10.5654 11.8397 10.4136 11.8094 10.272 11.7507C10.1304 11.692 10.0017 11.606 9.89334 11.4975L9.85834 11.4625C9.72086 11.328 9.54624 11.2378 9.35701 11.2035C9.16778 11.1692 8.97261 11.1923 8.79667 11.27C8.62414 11.3439 8.47699 11.4667 8.37335 11.6232C8.2697 11.7797 8.21408 11.9631 8.21334 12.1508V12.25C8.21334 12.5594 8.09042 12.8562 7.87163 13.075C7.65283 13.2938 7.35609 13.4167 7.04667 13.4167C6.73725 13.4167 6.4405 13.2938 6.22171 13.075C6.00292 12.8562 5.88 12.5594 5.88 12.25V12.1975C5.87549 12.0044 5.81299 11.8172 5.70063 11.6601C5.58828 11.503 5.43127 11.3833 5.25 11.3167C5.07406 11.239 4.87889 11.2159 4.68966 11.2502C4.50043 11.2845 4.32582 11.3747 4.18834 11.5092L4.15334 11.5442C4.04498 11.6526 3.91631 11.7387 3.77468 11.7974C3.63305 11.8561 3.48124 11.8863 3.32792 11.8863C3.1746 11.8863 3.02279 11.8561 2.88116 11.7974C2.73952 11.7387 2.61085 11.6526 2.5025 11.5442C2.39403 11.4358 2.30798 11.3071 2.24927 11.1655C2.19055 11.0239 2.16033 10.8721 2.16033 10.7188C2.16033 10.5654 2.19055 10.4136 2.24927 10.272C2.30798 10.1304 2.39403 10.0017 2.5025 9.89333L2.5375 9.85833C2.67198 9.72085 2.76219 9.54624 2.79651 9.35701C2.83082 9.16778 2.80765 8.97261 2.73 8.79667C2.65606 8.62413 2.53328 8.47699 2.37677 8.37335C2.22027 8.2697 2.03688 8.21408 1.84917 8.21333H1.75C1.44058 8.21333 1.14384 8.09042 0.925045 7.87162C0.706252 7.65283 0.583336 7.35609 0.583336 7.04667C0.583336 6.73725 0.706252 6.4405 0.925045 6.22171C1.14384 6.00292 1.44058 5.88 1.75 5.88H1.8025C1.99558 5.87548 2.18284 5.81299 2.33993 5.70063C2.49702 5.58828 2.61667 5.43126 2.68334 5.25C2.76099 5.07406 2.78415 4.87889 2.74984 4.68966C2.71553 4.50043 2.62532 4.32581 2.49084 4.18833L2.45584 4.15333C2.34736 4.04498 2.26131 3.91631 2.2026 3.77468C2.14389 3.63305 2.11367 3.48123 2.11367 3.32792C2.11367 3.1746 2.14389 3.02278 2.2026 2.88115C2.26131 2.73952 2.34736 2.61085 2.45584 2.5025C2.56419 2.39403 2.69286 2.30798 2.83449 2.24926C2.97612 2.19055 3.12793 2.16033 3.28125 2.16033C3.43457 2.16033 3.58639 2.19055 3.72802 2.24926C3.86965 2.30798 3.99832 2.39403 4.10667 2.5025L4.14167 2.5375C4.27915 2.67198 4.45376 2.76219 4.64299 2.7965C4.83222 2.83081 5.02739 2.80765 5.20334 2.73H5.25C5.42253 2.65605 5.56968 2.53327 5.67332 2.37677C5.77697 2.22027 5.83259 2.03688 5.83334 1.84917V1.75C5.83334 1.44058 5.95625 1.14383 6.17505 0.925042C6.39384 0.706249 6.69058 0.583333 7 0.583333C7.30942 0.583333 7.60617 0.706249 7.82496 0.925042C8.04375 1.14383 8.16667 1.44058 8.16667 1.75V1.8025C8.16742 1.99021 8.22304 2.1736 8.32668 2.3301C8.43033 2.48661 8.57747 2.60939 8.75 2.68333C8.92595 2.76098 9.12112 2.78415 9.31035 2.74984C9.49958 2.71552 9.67419 2.62531 9.81167 2.49083L9.84667 2.45583C9.95502 2.34736 10.0837 2.26131 10.2253 2.2026C10.367 2.14389 10.5188 2.11367 10.6721 2.11367C10.8254 2.11367 10.9772 2.14389 11.1189 2.2026C11.2605 2.26131 11.3892 2.34736 11.4975 2.45583C11.606 2.56419 11.692 2.69286 11.7507 2.83449C11.8095 2.97612 11.8397 3.12793 11.8397 3.28125C11.8397 3.43457 11.8095 3.58638 11.7507 3.72801C11.692 3.86964 11.606 3.99831 11.4975 4.10667L11.4625 4.14167C11.328 4.27915 11.2378 4.45376 11.2035 4.64299C11.1692 4.83222 11.1924 5.02739 11.27 5.20333V5.25C11.3439 5.42253 11.4667 5.56968 11.6232 5.67332C11.7797 5.77696 11.9631 5.83258 12.1508 5.83333H12.25C12.5594 5.83333 12.8562 5.95625 13.075 6.17504C13.2938 6.39383 13.4167 6.69058 13.4167 7C13.4167 7.30942 13.2938 7.60617 13.075 7.82496C12.8562 8.04375 12.5594 8.16667 12.25 8.16667H12.1975C12.0098 8.16742 11.8264 8.22304 11.6699 8.32668C11.5134 8.43032 11.3906 8.57747 11.3167 8.75V8.75Z"
                  stroke="#383838"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_85">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            class="group p-1 flex justify-center items-center rounded hover:bg-zinc-200"
            onClick={appWindow.minimize}
          >
            <svg
              width="10"
              height="2"
              viewBox="0 0 10 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="10" height="1" fill="#575757" />
            </svg>
          </button>
          <button
            class="group p-1 rounded hover:bg-red-500"
            onClick={appWindow.close}
          >
            <svg
              width="11"
              height="11"
              class="stroke-[#575757] group-hover:stroke-white"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1.25L10.5 10.25" />
              <path d="M1.25 10.5L10.25 1" />
            </svg>
          </button>
        </div>
      </div>
      <div class="w-full px-3 flex justify-between items-center">
        <button
          onClick={() => {
            generateLorem();
          }}
          class="px-4 py-2 text-white text-xs rounded bg-zinc-800"
        >
          Generate
        </button>
        <div class="w-full flex ml-2">
          <input
            type="number"
            class="p-[7px] w-full outline-none text-xs text-gray-700 rounded-l border border-r-0 border-solid border-gray-300"
            value={20}
            min="1"
            onChange={changeNumber}
          />
          <select
            class="w-[65%] rounded-r border border-solid border-gray-300 text-xs bg-[#F4F4F4]"
            onChange={changeUnit}
          >
            <option value="0" selected>
              word
            </option>
            <option value="1">sentence</option>
            <option value="2">paragraph</option>
          </select>
        </div>
      </div>
      <main class="relative py-2 px-3 h-[calc(100%_-_35px_-_32px)] w-full flex justify-center items-center">
        <button
          class="absolute right-[18px] top-[12px] rounded p-1 bg-[#F0F0F0] bg-opacity-75"
          onClick={() => {
            saveToClipboard();
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2_74)">
              <path
                d="M11.6667 5.25H6.41667C5.77233 5.25 5.25 5.77233 5.25 6.41667V11.6667C5.25 12.311 5.77233 12.8333 6.41667 12.8333H11.6667C12.311 12.8333 12.8333 12.311 12.8333 11.6667V6.41667C12.8333 5.77233 12.311 5.25 11.6667 5.25Z"
                stroke="black"
                stroke-opacity="0.49"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.91667 8.75H2.33333C2.02391 8.75 1.72717 8.62709 1.50837 8.40829C1.28958 8.1895 1.16667 7.89275 1.16667 7.58334V2.33333C1.16667 2.02392 1.28958 1.72717 1.50837 1.50838C1.72717 1.28958 2.02391 1.16667 2.33333 1.16667H7.58333C7.89275 1.16667 8.1895 1.28958 8.40829 1.50838C8.62708 1.72717 8.75 2.02392 8.75 2.33333V2.91667"
                stroke="black"
                stroke-opacity="0.49"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_74">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <p class="w-full h-full bg-[#F0F0F0] rounded font-inria text-xs p-2 overflow-auto scrollbar-cool">
          {result()}
        </p>
      </main>
    </div>
  );
}

export default App;
