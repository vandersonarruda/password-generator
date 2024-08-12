import React, { useState } from 'react';
import './PasswordGenerator.scss';
import CopyIcon from '../CopyIcon';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(10);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterPool = '';
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (!characterPool) return;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean
  ) => {
    const totalSelected = Number(includeLowercase) + Number(includeUppercase) + Number(includeNumbers) + Number(includeSymbols);
    if (totalSelected === 1 && value) {
      
      return;
    }
    setter(!value);
  };

  return (
    <div className="password-generator">
      <div className="password-input">
        <input type="text" value={password} readOnly />
        <button onClick={copyToClipboard} aria-label="Copy password">
          <CopyIcon />
        </button>
      </div>
      <div className="password-options">
        <div className="password-range">
          <label>  
            Character length {length}
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="password-config">
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => handleCheckboxChange(setIncludeLowercase, includeLowercase)}
            />
            Include Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => handleCheckboxChange(setIncludeUppercase, includeUppercase)}
            />
            Include Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => handleCheckboxChange(setIncludeNumbers, includeNumbers)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => handleCheckboxChange(setIncludeSymbols, includeSymbols)}
            />
            Include Symbols
          </label>
        </div>
      </div>
      <button onClick={generatePassword}>Generate</button>
    </div>
  );
};

export default PasswordGenerator;
