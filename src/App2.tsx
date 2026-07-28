import { useState, useEffect } from 'react';
//useEffect so it can fetch data when it loads
import './App2.css'; //pulls the styles into the file
import { supabase } from './supabaseClient';

interface Group {
  id: string;
  name: string;
  iconText: string;
}

export default function App() {
  //alert('App2 is running!');
  // 1. Declare all state variables (including loading!)
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // 👈 declared right here!
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // 2. Fetch loops from Supabase when the app starts
  useEffect(() => {
    async function fetchGroups() {
      try {
        setErrorMessage(null);
        const { data, error } = await supabase
          .from('letterloop_groups')
          .select('*')
          .order('created_at', { ascending: true });

        // 👇 ADD THIS TEMPORARY DEBUG LINE:
        //alert('DB Response: ' + JSON.stringify({ data, error }));
        if (error) throw error;

        if (data) {
          // Map database snake_case columns to your frontend camelCase properties
          const formatted: Group[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            iconText: item.icon_text, // maps database snake_case to your React camelCase
          }));
          setGroups(formatted);
          if (formatted.length > 0) setActiveGroup(formatted[0].id);
        }
      } catch (err: any) {
        //treat err as any type of object it can safely read its .message property without you blocking the build
        console.error('Error fetching groups:', err);
        setErrorMessage(err.message || 'Failed to connect to database');
      } finally {
        setLoading(false); // turn off loading state when done
      }
    }
    fetchGroups();
  }, []);
  // Save and Show Engine
  const handleAddGroup = async () => {
    const groupName = prompt('Enter the name for your new Loop:');
    if (!groupName || !groupName.trim()) return;

    try {
      const { data, error } = await supabase
        .from('letterloop_groups')
        .insert([{ name: groupName.trim(), icon_text: '💬' }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newGroup: Group = {
          id: data[0].id,
          name: data[0].name,
          iconText: data[0].icon_text,
        };
        setGroups([...groups, newGroup]);
        setActiveGroup(newGroup.id);
      }
    } catch (err) {
      console.error('Error adding group:', err);
    }
  };
  //Avodoing crashing while loading
  if (loading) {
    return (
      <div
        style={{
          color: '#fff',
          textAlign: 'center',
          marginTop: '100px',
          fontFamily: 'sans-serif',
        }}
      >
        <h2>Connecting to database...</h2>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div
        style={{
          color: '#ff4a4a',
          textAlign: 'center',
          marginTop: '100px',
          fontFamily: 'sans-serif',
        }}
      >
        <h2>⚠️ Database Connection Error</h2>
        <p
          style={{
            background: '#222',
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* 1. Header */}
      <header className="app-header">
        <h1>Letterloop Clone</h1>
        <p>Connect with your circles weekly</p>
      </header>

      {/* 2. Horizontal Round Group Navigation Bar */}
      <div className="group-navigation">
        {groups.map((group) => (
          <button
            key={group.id}
            className={`group-circle-btn ${
              /* our button class*/
              activeGroup === group.id ? 'active' : ''
            }`}
            onClick={() => setActiveGroup(group.id)}
            title={group.name}
          >
            <span className="group-icon">{group.iconText}</span>
            <span className="group-label">{group.name}</span>
          </button>
        ))}

        {/* The Action Button to add a new group */}
        <button
          className="group-circle-btn add-btn"
          onClick={handleAddGroup}
          //onClick={() => {
          /* () is an anon function. => like an anchor,locks the function to the component it was written in (is defining it here) */
          //const groupName = prompt('Enter the name for your new Loop:');
          //console.log('User entered loop name:', groupName);
          //}}
        >
          <span className="group-icon">+</span>
          <span className="group-label">New Loop</span>
        </button>
      </div>

      {/* 3. Main Action Workspace */}
      <main className="workspace">
        <div className="card">
          <h2>Sending to: {groups.find((g) => g.id === activeGroup)?.name}</h2>
          <p className="prompt">
            💡 What was your favorite moment this week? Write it down below.
          </p>
          <textarea
            placeholder="Type your weekly update here for the newsletter..."
            rows={4}
          />
          <button className="submit-btn">Submit Entry</button>
        </div>
      </main>
    </div>
  );
}
