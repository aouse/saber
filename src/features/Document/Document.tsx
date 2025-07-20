import React from "react";
import ContentArea from "@/components/ContentArea/ContentArea";
import Button from "@/components/Button/Button";
import { LoremIpsum } from "lorem-ipsum";
import { useDispatch, useSelector } from "react-redux";
import { clearAllApprovals, setText, updateAllExtractedTerms,  } from "@/store/slices/dashboardSlice";
import { AppDispatch, RootState } from "@/store/store";
import styles from './document.module.css'

const lorem = new LoremIpsum();

const Content: React.FC = () => {
  const savedText = useSelector((state: RootState) => state.dashboard.text);
  const dispatch = useDispatch<AppDispatch>();
  const hydrated = useSelector((state: RootState) => state.dashboard.hydrated);

  const buttonHandler = () => {
     const newText = lorem.generateParagraphs(2)
     dispatch(setText(newText))
     dispatch(clearAllApprovals());
     dispatch(updateAllExtractedTerms({ text: newText }));
  }
  
  return (
    <div className={styles.document}>
        {!hydrated && <div>Loading document...</div>}
        <div className={styles.infoBox}>
          <p>Use the panel on the left to add regex patterns that you would like to extract content from the text below.</p>
          <p>For example</p>
          <ul>
            <li>Enter <code>{String.raw`\b\w{9,}\b`}</code> in regex box for a pattern to find all the words that have 9 or more letters</li>
            <li>Enter <code>{String.raw`\b\w*orem\w*\b`}</code> in the regex box for a pattern to find all the words that contain the string <strong>orem</strong></li>
          </ul>

        </div>
        <ContentArea text={savedText}  />
        <Button handler={buttonHandler} title={"Regenerate text"} />
    </div>
  );
};

export default Content;