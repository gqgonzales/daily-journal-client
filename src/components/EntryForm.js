import React, { useContext, useState, useEffect } from "react";
import { EntryContext } from "./EntryProvider";
import { MoodContext } from "./mood/MoodProvider";

export const EntryForm = (props) => {
  const { addEntry, updateEntry, entry, setEntry } =
    useContext(EntryContext);
  const { moods, getMoods } = useContext(MoodContext);

  const [editMode, editModeChanged] = useState(false);

  useEffect(() => {
    getMoods();
  }, []);

  useEffect(() => {
    if ("id" in entry) {
      editModeChanged(true);
    } else {
      editModeChanged(false);
    }
  }, [entry]);

  const handleControlledInputChange = (event) => {
    /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
    const newEntry = Object.assign({}, entry);
    newEntry[event.target.name] = event.target.value;
    setEntry(newEntry);
  };

  const constructNewEntry = () => {
    let d = new Date();
    if (editMode) {
      updateEntry({
        id: entry.id,
        concept: entry.concept,
        body: entry.body,
        entry_date: entry.entry_date,
        mood_id: parseInt(entry.mood_id),
      });
    } else {
      addEntry({
        concept: entry.concept,
        body: entry.body,
        entry_date: d.toLocaleDateString("en-US"),
        mood_id: parseInt(entry.mood_id),
      });
    }
    setEntry({ concept: "", entry: "", mood_id: 0 });
  };

  return (
    <form className="EntryForm">
      <h2 className="EntryForm__title">
        {editMode ? "Update Entry" : "Create Entry"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="concept">Concept: </label>
          <input
            type="text"
            name="concept"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="Concept"
            value={entry.concept}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="body">Entry: </label>
          <input
            type="text"
            name="body"
            required
            className="form-control"
            proptype="varchar"
            placeholder="Entry Body"
            value={entry.body}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="mood_id">Mood: </label>
          <select
            name="mood_id"
            className="form-control"
            proptype="int"
            value={entry.mood_id}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a mood</option>
            {moods.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          constructNewEntry();
        }}
        className="btn btn-primary"
      >
        {editMode ? "Update" : "Save"}
      </button>
    </form>
  );
};
