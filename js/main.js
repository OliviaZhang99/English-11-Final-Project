function typeText(element, text, speed = 14) {
  element.textContent = "";
  let i = 0;

  function tick() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(tick, speed);
    }
  }

  tick();
}

function renderEvent(ev) {
  E.eventTitle.textContent = `Age ${state.age} — ${ev.title}`;
  typeText(E.eventBody, ev.body);
  E.choiceRow.innerHTML = "";

  setAwaitingChoice(true);

  ev.choices.forEach((ch) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-ghost";
    b.textContent = ch.text;

    b.addEventListener("click", () => {
      if (ev.onceId) mark(ev.onceId);

      if (typeof ch.apply === "function") ch.apply();

      applyDelta(state, ch.delta);
      state.money = Math.round(state.money);

      showDeltaPopup(ch.delta);
      if (ch.log) logLine(E, ch.log);

      renderSidebar(state, E);

      const nxt = nextPendingEvent();
      if (nxt) return renderEvent(nxt);

      E.choiceRow.innerHTML = "";
      setAwaitingChoice(false);
      E.btnNextYear.focus();
    });

    E.choiceRow.appendChild(b);
  });
}
