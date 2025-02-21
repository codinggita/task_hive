import { Link } from "react-router-dom";
import "./Home.css"; 

function Home() {
  return (
    <div className="home-container">
      {/* Top Image Section */}
      <div className="top-image">
        <img src="https://www.shutterstock.com/image-vector/business-planning-task-management-concept-260nw-1987578881.jpg" alt="Task Management" className="home-image" />
      </div>

      {/* Main Content Section */}
      <div className="content">
        <h1>🚀 Boost Your Productivity with Task Manager</h1>
        <p>
          Organize your tasks, collaborate with your team, and stay on top of your work effortlessly.
        </p>

        {/* Buttons for Registration and Login */}
        <div className="buttons">
          <Link to="/register">
            <button className="register-btn">Get Started</button>
          </Link>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>

        {/* Information About the Website */}
        <section className="info-section">
          <h2>About Our Task Manager</h2>
          <p>
            Our Task Manager is designed to help individuals and teams manage their tasks efficiently. 
            With a user-friendly interface and powerful features, you can prioritize your work and 
            collaborate seamlessly with your team.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Task Assignment and Tracking</li>
            <li>Real-time Collaboration</li>
            <li>Customizable Workflows</li>
            <li>Deadline Reminders</li>
            <li>Analytics and Reporting</li>
          </ul>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <h3>Key Points</h3>
        <ul>
          <li>Boost productivity</li>
          <li>Collaborate with ease</li>
          <li>Stay organized</li>
          <li>Access from anywhere</li>
          <li>Join our community today!</li>
        </ul>
      </footer>
    </div>
  );
}

export default Home;