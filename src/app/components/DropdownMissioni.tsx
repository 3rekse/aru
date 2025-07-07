import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
interface Mission {
  missione: string;
  descrizione: string;
  posizione: number;
  livello: string;
}

const DropdownMissioni: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    fetch("/missions.json")
      .then(res => res.json())
      .then(data => setMissions(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    if (value) {
      const selectedMission = missions.find(m => m.missione === value);
      if (selectedMission) {
        const params = new URLSearchParams({
          mission: selectedMission.missione,
          missionD: selectedMission.descrizione,
        });
        window.location.href = `/?${params.toString()}`;
      }
    }
  };

  return (
    <select className={styles.selectTrasparente}
      value={selected}
      onChange={handleChange}
    >
      <option value="">Seleziona una missione </option>
      {missions
        .sort((a, b) => a.posizione - b.posizione)
        .map(m => (
          <option  key={m.missione} value={m.missione}>
            ({m.livello}){m.missione} - {m.descrizione} 
          </option>
        ))}
    </select>
  );
};

export {DropdownMissioni};