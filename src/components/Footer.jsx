import DemoPanel from './DemoPanel.jsx'

function Footer(props) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          <strong>Margalla Move Studio</strong>, F-7 Markaz, Islamabad. In-person classes only.
        </p>
        <p>
          This is a simulated booking demo. No payment is taken and nothing is sent anywhere.
        </p>
        <p>CS4032 Web Programming, Assignment 02 - Muhammad Ali (24I-2089)</p>
        <DemoPanel {...props} />
      </div>
    </footer>
  )
}

export default Footer
