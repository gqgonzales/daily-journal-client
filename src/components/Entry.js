import React, { useContext } from "react";
import { EntryContext } from "./EntryProvider";

export const Entry = ({ entry, moods }) => {
  const mood = moods.find((m) => m.id === entry.mood_id);
  const { deleteEntry, getEntryById } = useContext(EntryContext);

  return (
    <>
      <section className="entry">
        <div className="entry__date">{entry.entry_date}</div>
        <div className="entry__concept">
          <em>{entry.concept}</em>
        </div>
        <div className="entry__body">{entry.body}</div>
        <div className="entry__mood">Mood: {mood.label}</div>

        <button
          onClick={() => {
            deleteEntry(entry);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            getEntryById(entry.id);
          }}
        >
          Edit
        </button>
      </section>
      <br></br>
    </>
  );
};
