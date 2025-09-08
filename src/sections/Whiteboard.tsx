import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'

interface Note {
  id: string
  title: string
  content: string
  date: string
}

// Simple markdown-like renderer
const MarkdownRenderer = ({ content }: { content: string }) => {
  const lines = content.split('\n')
  let inCodeBlock = false
  let currentList: JSX.Element[] = []
  const elements: JSX.Element[] = []
  let codeBlockLines: string[] = []
  
  lines.forEach((line, index) => {
    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre key={`code-${index}`} className="whiteboard__code-block">
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        )
        codeBlockLines = []
        inCodeBlock = false
      } else {
        // Start code block
        inCodeBlock = true
      }
      return
    }
    
    if (inCodeBlock) {
      codeBlockLines.push(line)
      return
    }
    
    // Handle lists
    if (line.startsWith('- ') || line.match(/^\d+\. /)) {
      const isOrdered = line.match(/^\d+\. /)
      const text = isOrdered ? line.replace(/^\d+\. /, '') : line.slice(2)
      currentList.push(
        <li key={index} className="whiteboard__list-item">
          {text}
        </li>
      )
      return
    } else if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="whiteboard__list">
          {currentList}
        </ul>
      )
      currentList = []
    }
    
    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="whiteboard__h1">{line.slice(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="whiteboard__h2">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="whiteboard__h3">{line.slice(4)}</h3>)
    } else if (line.trim()) {
      // Regular paragraphs
      elements.push(<p key={index} className="whiteboard__paragraph">{line}</p>)
    } else {
      // Empty lines
      elements.push(<br key={index} />)
    }
  })
  
  // Add remaining list items
  if (currentList.length > 0) {
    elements.push(
      <ul key={`list-final`} className="whiteboard__list">
        {currentList}
      </ul>
    )
  }
  
  return <div className="whiteboard__content">{elements}</div>
}

const Whiteboard = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading notes (in a real app, this would fetch from an API)
    const loadNotes = async () => {
      try {
        // For demo purposes, we'll create mock notes based on our markdown files
        const mockNotes: Note[] = [
          {
            id: 'welcome',
            title: 'Welcome to My Whiteboard',
            content: `# Welcome to My Whiteboard

This is where I share thoughts, experiments, and insights from my journey in AI/ML engineering.

## Recent Explorations

- **Agentic Systems**: Building autonomous AI agents that can reason and act
- **Document Intelligence**: Extracting insights from unstructured data
- **Generative AI Ethics**: Responsible development and deployment practices

## Code Snippets

Here's a simple example of a document processing pipeline:

\`\`\`python
def process_document(doc_path):
    # Extract text and metadata
    text = extract_text(doc_path)
    metadata = extract_metadata(doc_path)
    
    # Apply NLP processing
    entities = extract_entities(text)
    sentiment = analyze_sentiment(text)
    
    return {
        'text': text,
        'entities': entities,
        'sentiment': sentiment,
        'metadata': metadata
    }
\`\`\`

## Things I'm Learning

1. **Multimodal AI**: Combining text, image, and audio processing
2. **Edge Deployment**: Running ML models on resource-constrained devices
3. **Prompt Engineering**: Optimizing interactions with LLMs

---

*Updated: December 2024*`,
            date: 'December 2024'
          },
          {
            id: 'ai-reflections',
            title: 'AI Reflections: The Human-Machine Interface',
            content: `# AI Reflections: The Human-Machine Interface

As we advance deeper into the age of artificial intelligence, I find myself constantly reflecting on the relationship between human creativity and machine capability.

## The Creativity Paradox

Working with generative AI daily has shown me something fascinating: **AI doesn't replace human creativity; it amplifies it.** The most powerful applications emerge when we combine:

- Human intuition and context
- Machine processing power and pattern recognition
- Collaborative refinement processes

## Technical Insights

### LLM Fine-tuning Best Practices

From recent projects, I've learned that effective fine-tuning requires:

1. **Quality over Quantity**: 1000 high-quality examples beat 10,000 mediocre ones
2. **Domain Alignment**: Training data must match your specific use case
3. **Iterative Validation**: Continuous testing prevents overfitting

### Agentic System Design

The future lies in AI agents that can:
- **Plan** multi-step tasks autonomously
- **Adapt** to changing requirements in real-time
- **Communicate** effectively with humans and other agents

## Looking Forward

The next frontier in AI/ML isn't just about bigger models—it's about:

- **Efficiency**: Doing more with less computational resources
- **Interpretability**: Understanding how AI makes decisions
- **Integration**: Seamless human-AI collaboration

---

*These reflections come from hands-on experience building production AI systems. What patterns are you seeing in your work?*`,
            date: 'November 2024'
          }
        ]
        
        setNotes(mockNotes)
        setSelectedNote(mockNotes[0])
      } catch (error) {
        console.error('Failed to load notes:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadNotes()
  }, [])
  
  return (
    <Section id="whiteboard" className="whiteboard">
      <motion.div
        className="whiteboard__container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 
          className="whiteboard__title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Notes & Thoughts
        </motion.h2>
        
        <motion.p 
          className="whiteboard__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Ideas, insights, and experiments from my AI/ML journey
        </motion.p>
        
        <div className="whiteboard__layout">
          <motion.div 
            className="whiteboard__sidebar"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="whiteboard__sidebar-title">Recent Notes</h3>
            
            {loading ? (
              <div className="whiteboard__loading">Loading notes...</div>
            ) : (
              <ul className="whiteboard__notes-list">
                {notes.map((note, index) => (
                  <motion.li
                    key={note.id}
                    className={`whiteboard__note-item ${
                      selectedNote?.id === note.id ? 'whiteboard__note-item--active' : ''
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedNote(note)}
                  >
                    <h4 className="whiteboard__note-title">{note.title}</h4>
                    <span className="whiteboard__note-date">{note.date}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
          
          <motion.div 
            className="whiteboard__main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {selectedNote ? (
              <div className="whiteboard__note">
                <div className="whiteboard__note-meta">
                  <h3 className="whiteboard__note-title-main">{selectedNote.title}</h3>
                  <span className="whiteboard__note-date-main">{selectedNote.date}</span>
                </div>
                
                <MarkdownRenderer content={selectedNote.content} />
              </div>
            ) : (
              <div className="whiteboard__empty">
                <p>Select a note to read</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}

export default Whiteboard