import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../context/user.context';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket';
import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import { getWebContainer } from '../config/webcontainer';

const Project = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const [project, setProject] = useState(location.state.project);
    const [message, setMessage] = useState('');
    const messageBox = useRef(null);
    const [messages, setMessages] = useState([]);
    const [fileTree, setFileTree] = useState({});
    const [currentFile, setCurrentFile] = useState(null);
    const [openFiles, setOpenFiles] = useState([]);
    const [webContainer, setWebContainer] = useState(null);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [runProcess, setRunProcess] = useState(null);

    useEffect(() => {
        initializeSocket(project._id);

        if (!webContainer) {
            getWebContainer().then(container => {
                setWebContainer(container);
                console.log("container started");
            });
        }

        receiveMessage('project-message', data => {
            console.log(data);
            if (data.sender._id === 'ai') {
                const message = JSON.parse(data.message);
                webContainer?.mount(message.fileTree);
                if (message.fileTree) {
                    setFileTree(message.fileTree || {});
                }
                setMessages(prevMessages => [...prevMessages, data]);
            } else {
                setMessages(prevMessages => [...prevMessages, data]);
            }
        });

        axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
            setProject(res.data.project);
            setFileTree(res.data.project.fileTree || {});
        });

        axios.get('/users/all').then(res => {
            setUsers(res.data.users);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const send = () => {
        sendMessage('project-message', {
            message,
            sender: user
        });
        setMessages(prevMessages => [...prevMessages, { sender: user, message }]);
        setMessage("");
    };

    const saveFileTree = (ft) => {
        axios.put('/projects/update-file-tree', {
            projectId: project._id,
            fileTree: ft
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <main className='h-screen w-screen flex'>
            {/* Your existing code */}
        </main>
    );
};

export default Project;

// import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;