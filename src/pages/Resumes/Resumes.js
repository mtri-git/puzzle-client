import { useEffect } from 'react';
import { ResumeProvider } from '../../Context';
import Main from '../../component/Main';
import WebFont from 'webfontloader';
import { ChakraProvider } from '@chakra-ui/react';
function Resumes() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Pacifico', 'Poppins']
      }
    });
  }, []);

  return (
    <>
      <ChakraProvider>
        <ResumeProvider>
          <Main />
        </ResumeProvider>
      </ChakraProvider>
    </>
  );
}

export default Resumes;
