import { useState } from "react";
import { useSharedCardStack } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };

export function Feature({ room, config }: Props) {
  const deck = useSharedCardStack(room);
  const [label, setLabel] = useState("");

  return (
    <main className="card-sorter">
      <h1>{config.appName}</h1>
      <p className="lede">
        Add a card, then flip it when your group is ready to reveal or sort the idea.
      </p>
      <form
        className="card-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (deck.add(label)) setLabel("");
        }}
      >
        <label htmlFor="card-label">New card</label>
        <div className="input-row">
          <input
            id="card-label"
            maxLength={120}
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="e.g. Invite a neighbour"
          />
          <button type="submit" disabled={!room || !label.trim()}>
            Add card
          </button>
        </div>
      </form>
      <p className="status" aria-live="polite">
        {deck.cards.length} shared card{deck.cards.length === 1 ? "" : "s"}
      </p>
      <section className="cards" aria-label="Shared cards">
        {deck.cards.length ? (
          deck.cards.map((card, index) => (
            <article className={card.flipped ? "card flipped" : "card"} key={card.id}>
              <p className="card-number">Card {index + 1}</p>
              <p>{card.flipped ? card.label : "Hidden until flipped"}</p>
              <button aria-pressed={card.flipped} type="button" onClick={() => deck.flip(card.id)}>
                {card.flipped ? "Hide card" : "Flip card"}
              </button>
            </article>
          ))
        ) : (
          <p className="empty">No cards yet. Add one to start the shared stack.</p>
        )}
      </section>
      <p className="feature-status">
        {room ? `Connected · ${room.peerCount} peer(s)` : "Connecting…"}
      </p>
    </main>
  );
}
