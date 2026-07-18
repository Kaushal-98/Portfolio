import { useEffect, useRef, useState } from 'react';
import { PROFILE, PROJECTS, EDUCATION, TECH_STACK } from '../data/content';
import styles from './TerminalPanel.module.css';

interface HistoryLine {
  id: number;
  type: 'input' | 'output';
  text: string;
}

let lineId = 0;

/**
 * A real command-line parser, not a video of one. Supports: help, whoami,
 * about, ls, cat <file>, education, skills, projects, contact, sudo hire-me,
 * clear. Arrow keys recall history; unknown commands get a specific,
 * helpful error rather than a generic failure.
 */
export function TerminalPanel() {
  const [history, setHistory] = useState<HistoryLine[]>([
    { id: lineId++, type: 'output', text: `Welcome. Type 'help' to see available commands.` },
  ]);
  const [input, setInput] = useState('');
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function print(text: string) {
    setHistory((h) => [...h, { id: lineId++, type: 'output', text }]);
  }

  function runCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    setHistory((h) => [...h, { id: lineId++, type: 'input', text: cmd }]);
    setCommandLog((log) => [...log, cmd]);
    setLogIndex(-1);

    const [name, ...args] = cmd.toLowerCase().split(' ');

    switch (name) {
      case 'help':
        print(
          'Commands: help, whoami, about, education, skills, projects, contact, cat resume.pdf, sudo hire-me, clear'
        );
        break;
      case 'whoami':
        print(`${PROFILE.name} — ${PROFILE.title}`);
        break;
      case 'about':
        print(PROFILE.bio);
        break;
      case 'ls':
        print('about.md  education.json  skills.json  projects/  contact.ts');
        break;
      case 'education':
        EDUCATION.forEach((e) => print(`${e.period.padEnd(20)} ${e.institution} — ${e.credential} (${e.detail})`));
        break;
      case 'skills':
        TECH_STACK.forEach((cat) => print(`${cat.label}: ${cat.items.join(', ')}`));
        break;
      case 'projects':
        PROJECTS.forEach((p) => print(`${p.name} (${p.period}) — ${p.summary}`));
        break;
      case 'contact':
        print(`Email: ${PROFILE.email}  ·  GitHub: ${PROFILE.github}  ·  LinkedIn: ${PROFILE.linkedin}`);
        break;
      case 'cat':
        if (args.join(' ') === 'resume.pdf') {
          print('Opening resume... (link this to your hosted resume PDF)');
        } else {
          print(`cat: ${args.join(' ') || '(no file)'}: No such file`);
        }
        break;
      case 'sudo':
        if (args.join(' ') === 'hire-me') {
          print('[sudo] escalating privileges...');
          print(`Permission granted. Reach out any time: ${PROFILE.email}`);
        } else {
          print(`sudo: ${args.join(' ')}: command not found`);
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        print(`command not found: '${name}' — try 'help'`);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandLog.length === 0) return;
      const nextIndex = logIndex < 0 ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(nextIndex);
      setInput(commandLog[nextIndex]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (logIndex < 0) return;
      const nextIndex = logIndex + 1;
      if (nextIndex >= commandLog.length) {
        setLogIndex(-1);
        setInput('');
      } else {
        setLogIndex(nextIndex);
        setInput(commandLog[nextIndex]);
      }
    }
  }

  return (
    <div className={styles.wrapper} onClick={() => inputRef.current?.focus()}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span className={styles.title}>~/portfolio — zsh</span>
      </div>
      <div className={styles.output} ref={scrollRef} role="log" aria-live="polite">
        {history.map((line) => (
          <p key={line.id} className={line.type === 'input' ? styles.inputLine : styles.outputLine}>
            {line.type === 'input' ? `$ ${line.text}` : `> ${line.text}`}
          </p>
        ))}
      </div>
      <div className={styles.inputRow}>
        <span aria-hidden="true">$</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command input"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
