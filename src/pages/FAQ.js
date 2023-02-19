import React, { useState } from "react";
import classNames from "classnames";
import "./About.css";

function FAQ({
  children,
  defaultOpen = [],
  open: openFromProps,
  onToggle: onToggleFromProps = () => {}
}) {
  const isControlled = () => (openFromProps ? true : false);
  const [open, setIsOpen] = useState(defaultOpen);
  const getOpen = () => (isControlled() ? openFromProps : open);
  const isOpen = index => {
    return getOpen().includes(index) ? true : false;
  };
  const onToggle = index => {
    if (isControlled()) {
      onToggleFromProps(index);
    } else {
      if (getOpen().includes(index)) {
        setIsOpen(getOpen().filter(item => item !== index));
      } else {
        setIsOpen([...getOpen(), index]);
      }

      onToggleFromProps(index);
    }
  };
  return (
    <dl>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isOpen: isOpen(index),
          onToggle: () => onToggle(index)
        });
      })}
    </dl>
  );
}

function Question({ children, isOpen, answerId, onToggle }) {
  return (
    <dt>
      <button
        className="FAQ__question"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
      >
        {children(isOpen, onToggle)}
      </button>
    </dt>
  );
}

function Answer({ children, id, isOpen }) {
  const mergedClassname = classNames("FAQ__answer", {
    "FAQ__answer--hidden": !isOpen
  });
  return (
    <dd>
      <p className={mergedClassname} id={id}>
        {children}
      </p>
    </dd>
  );
}

function QAItem({ children, isOpen, onToggle }) {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isOpen: isOpen,
      onToggle: onToggle
    });
  });
}

FAQ.QAItem = QAItem;
FAQ.Question = Question;
FAQ.Answer = Answer;

export default FAQ;
