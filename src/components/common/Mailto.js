import { AiOutlineMail } from 'react-icons/ai';

export function Mailto({ email }) {
  const subject = "Hello";
  const body = "This is a sample message";

  return (
    <div className=''>
      <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>
      <AiOutlineMail /> 
      <p>{        
        email
        }</p>
      </a>
    </div>
  );
}
