import React from "react"
import Toggle from '@/components/Toggle/Toggle'
import Form from "../../components/Form/Form"
import List from "@/components/List/List"
import styles from './panel.module.css'
import Button from "@/components/Button/Button"
import Dropdown from "@/components/Dropdown/Dropdown"
import { useRouter } from "next/navigation"
import { usePatternsLogic } from "../../hooks/usePatternsLogic"
import { ModeProps } from "@/types/dashboard"

const Panel: React.FC<ModeProps> = ({ mode }) => {
  const router = useRouter()
  const {
    showEdit,
    setShowEdit,
    selectedPattern,
    setSelectedPattern,
    patterns,
    hydrated,
    extractedTerms,
    selectedPatternObj,
    handleAddPattern,
    handleRemovePattern,
    handleEditPattern,
    approveSelectedPattern,
    confirmationText
  } = usePatternsLogic()

  const toggleHandler = () => {
    if (mode === "edit") {
      router.push("/dashboard/approval")
    } else {
      router.push("/dashboard/edit")
    }
  };

  return (
    <div className={styles.panel}>
      <div>
          <p>Toggle to switch between modes: </p>
          <p>Edit mode: <span className={styles.editCircle}></span></p>
          <p>Approval mode: <span className={styles.approvalCircle}></span></p>
       
        <Toggle checked={mode === 'edit'} handler={toggleHandler} />
      </div>
      {confirmationText && <p className={styles.confirmation}>{confirmationText}</p>}
      {mode === "edit" ? (
        <div>
          <h3>Currently in Edit Mode</h3>
          
          <h4>Add a new Regex pattern</h4>
          <Form onAdd={handleAddPattern} disabled={showEdit}/> 
          
          {!hydrated && <div>Loading saved patterns...</div>}
          {patterns.length > 0 && 
          <>          
          <h4>Manage your current regex patterns.</h4>
          <ul className={styles.patterns}>
              {patterns.map((pattern, idx) => (
              <li 
                key={idx} 
                className={`${styles.pattern} ${selectedPattern.id === pattern.id && !showEdit ? styles.selectedPattern : ""}`}
              >
                 {!showEdit &&
                 <>                
                  <div className={styles.patternInfo}>
                    Pattern: <span className={styles.patternName}>{pattern?.name} {pattern.approved && <span><strong>APRROVED</strong></span>}</span>
                    <span className={styles.patternCount}>{pattern.extractedTerms.length} results</span>
                  </div>
                
                    <div className={styles.patternActions}>
                      <span
                        className={styles.actionLink}
                        onClick={() => setSelectedPattern({ id: pattern.id, regex: pattern.regex, name: pattern.regex })}
                      >
                        view extractions
                      </span>
                      <span
                        className={styles.actionLink}
                        onClick={() => { setSelectedPattern(pattern); setShowEdit(!showEdit); }}
                      >
                        edit
                      </span>
                      <span
                        className={styles.actionLink}
                        onClick={() => handleRemovePattern(pattern.id)}
                      >
                        delete
                      </span>
                    </div>
                  </>

                }
                {showEdit && pattern.id === selectedPattern.id && (
                  <>
                    <p>Editing <strong>{selectedPattern.name}</strong></p>
                    <Form onAdd={handleEditPattern} currentRegex={selectedPattern.regex} currentName={selectedPattern.name} id={selectedPattern.id}/>
                    <Button handler={() => setShowEdit(!showEdit)} title={"cancel"} />
                  </>
                )}
              </li>
              ))}
          </ul>
          </>

            }
        </div>
      ) : (
        <div>
          <h3>Approval Mode</h3>
          {patterns.length === 0 && <p>You have no patterns to approve</p>}
          
          {patterns.length > 0 &&
          <>
          
          <p>Select and approve regex extractions.</p>
            <Dropdown 
              valueId={selectedPattern.id} 
              handler={
              e => {
                const pattern = patterns.find(p => p.id === e.target.value);
                if (pattern) setSelectedPattern(pattern);
              }}
              placeHolderString={"Select a pattern"}
              data={patterns}
              />
            <Button
              handler={approveSelectedPattern}
              disabled={selectedPatternObj.approved}
              title={selectedPatternObj.approved ? "Approved" : "Approve"}
            />
          </>
          }
        </div>
      )}
      
      {selectedPattern.regex !== "" && extractedTerms(selectedPattern.regex).length > 0 && !showEdit && (
        <List data={extractedTerms(selectedPattern.regex)} title={`Extracted Terms for "${selectedPattern.name}"`} />
      )}
    </div>
  );
};

export default Panel;