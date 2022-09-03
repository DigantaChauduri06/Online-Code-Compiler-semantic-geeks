import { useState } from "react";
import Editor from "@monaco-editor/react";
import toast from 'react-hot-toast';

import './Compiler.css';


const Compiler = () => {

    const [code, setCode] = useState('');
    const [customInput, setCustomInput] = useState('');
    const [outputDetails, setOutputDetails] = useState(null);
    const [languageName, setLanguageName] = useState('Javascript');
    const [language, setLanguage] = useState(languageName);

    if(language === 'c') {
        toast.success('C language selected successfully', {
            duration: 2000
        })
    }

    if(language === 'c++') {
        toast.success('C++ language selected successfully', {
            duration: 2000
        })
    }

    if(language === 'java') {
        toast.success('Java language selected successfully', {
            duration: 2000
        })
    }

    if(language === 'javascript') {
        toast.success('Javascript language selected successfully', {
            duration: 2000
        })
    }

    if(language === 'python') {
        toast.success('Python language selected successdully', {
            duration: 3000
        })
    }


    return (
        <>
            <div className="online_compiler_div">

                <div className="compiler-nav">

                    <div>
                        <span className='untitled'><span className='untitledText'>Untitled</span><ion-icon className='pencilIcon' name="create"></ion-icon></span>
                    </div>

                    <div className="dropdown_and_run_btn">
                        {/* choose language */}
                        <div className="dropdown">
                            <button className="dropbtn">{language}</button>
                            <div className="dropdown-content">
                                <a href="#" onClick={() => setLanguage('c')}>C</a>
                                <a href="#" onClick={() => setLanguage('c++')}>C++</a>
                                <a href="#" onClick={() => setLanguage('java')}>Java</a>
                                <a href="#" onClick={() => setLanguage('javascript')}>Javascript</a>
                                <a href="#" onClick={() => setLanguage('python')}>Python</a>
                            </div>
                        </div>


                        <button className="runBtn"><span className="runText">RUN</span><ion-icon className='run-icon' name="play-circle"></ion-icon></button>

                    </div>

                </div>

                <div className="code_editor_and_output">

                    <div className="code_editor">
                        <Editor language={language || 'Javascript'} defaultValue='' />
                    </div>

                    <div className="code_output">

                    </div>

                </div>
            </div>
        </>
    )
}

export default Compiler;