# Education Environment

Welcome to the **Education Environment** repository! This project provides a modular and scalable foundation for managing educational content, events, and assessments.

## Features
- **Questions Service**: Manage question creation, retrieval, and storage.
- **Exams Service**: Handle exam creation, updates, and publication.
- **Events Service**: Manage events, registrations, and locks for resource access.

## Technologies
This repository leverages a mix of modern programming languages and frameworks:
- **TypeScript**: For shared utilities and event-related services.
- **Java**: For exam-related modules and backend processing.
- **Kotlin**: For question-related services and Spring-based applications.
- **JavaScript**: For lightweight scripting purposes.

## Repository Structure
The repository is split into several services, each responsible for a distinct domain:
- `questions-service/`: Contains code for managing questions.
- `exams-service/`: Focuses on the lifecycle of exams.
- `events-service/`: Handles event management and synchronization.

## Getting Started
### Prerequisites
- Ensure you have `Java 11+`, `Node.js`, and `npm` installed.
- A database (e.g., PostgreSQL) for persistent storage.

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/psinalberth/education-env.git
   ```
2. Install dependencies for each service:
   ```bash
   cd <service-directory>
   npm install # for TypeScript services
   ./gradlew build # for Kotlin/Java services
   ```

### Running the Services
Each service can be started individually:
- For Node.js/TypeScript services:
  ```bash
  npm start
  ```
- For Kotlin/Java services:
  ```bash
  ./gradlew bootRun
  ```

## Contributing
Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) for submitting issues, pull requests, and feature requests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or support, please open an issue or contact the maintainer directly.

---

Happy coding!
