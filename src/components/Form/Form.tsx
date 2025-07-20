import React, { useState } from "react"
import styles from "./form.module.css"
import Button from "../Button/Button"



const Form: React.FC<{ onAdd: (regex: string, name: string, id: string) => void,  currentName?: string, currentRegex?: string, id?: string, disabled?: boolean }> = ({ onAdd, currentName="", currentRegex="", id="", disabled = false }) => {
  const [regex, setRegex] = useState<string>(currentRegex)
  const [name, setName] = useState<string>(currentName)
  const [error, setError] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   
    event.preventDefault();
     if (!regex.trim() || !name.trim()) {
    setError("Pattern regex and name cannot be empty.");
    return;
  }
    try {
      new RegExp(regex);
      setError("");
      onAdd(regex, name, id);
      if (!id) { 
        setRegex("");
        setName("");
      }
    } catch {
      setError("Invalid regex pattern");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={disabled}
          name={"name"}
          data-testid={"name"}
         
        />
      </label>
      </div>
      <div>
        <label>
        Regex Pattern:
        <input
          type="text"
          value={regex}
          onChange={e => setRegex(e.target.value)}
          disabled={disabled}
          name={"regex"}
          data-testid={"regex"}
        />
      </label>
      </div>
      <Button title={id ? "Save" : "Add"}  disabled={disabled}/>
      {error && <div className={styles.error}><p>{error}</p></div>}
    </form>
  );
};

export default Form;