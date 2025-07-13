# Contributing to Angular Terminal Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When creating a bug report, please include:

- **Clear and descriptive title**
- **Detailed description of the issue**
- **Steps to reproduce the problem**
- **Expected behavior**
- **Actual behavior**
- **Environment details** (browser, OS, Angular version)
- **Screenshots or GIFs** if applicable

### Suggesting Enhancements

We welcome feature requests! When suggesting enhancements:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed functionality**
- **Explain why this enhancement would be useful**
- **Include mockups or examples if possible**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes** following the coding standards below
4. **Test your changes** thoroughly
5. **Commit your changes** with clear commit messages
6. **Push to your branch** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request** with a detailed description

## 📋 Development Guidelines

### Code Style

- **Follow Angular Style Guide**: Adhere to the [Angular Style Guide](https://angular.io/guide/styleguide)
- **TypeScript**: Use strict mode and proper typing
- **Naming Conventions**: Use descriptive names for variables, functions, and components
- **Comments**: Add comments for complex logic or business rules
- **English**: All code and comments must be in English

### Component Structure

```typescript
// Good component structure
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit, OnDestroy {
  // Properties
  private destroy$ = new Subject<void>();

  // Lifecycle hooks
  ngOnInit(): void {
    // Initialization logic
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Public methods
  public doSomething(): void {
    // Implementation
  }

  // Private methods
  private helperMethod(): void {
    // Helper logic
  }
}
```

### Service Structure

```typescript
// Good service structure
@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private readonly apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  public getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }
}
```

### Testing

- **Unit Tests**: Write tests for all new functionality
- **Component Tests**: Test component logic and user interactions
- **Service Tests**: Test service methods and API calls
- **Coverage**: Aim for at least 80% code coverage

### Accessibility

- **ARIA Labels**: Add proper ARIA labels for screen readers
- **Keyboard Navigation**: Ensure all features are keyboard accessible
- **Color Contrast**: Maintain proper color contrast ratios
- **Focus Management**: Implement proper focus management

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm 9+ or yarn
- Angular CLI 20+

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidparys/angular-terminal-portfolio.git
   cd angular-terminal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Run linting**
   ```bash
   npm run lint
   ```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run e2e` - Run end-to-end tests

## 📝 Commit Message Guidelines

Use conventional commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(terminal): add new command for matrix control
fix(matrix): resolve animation performance issue
docs(readme): update installation instructions
style(components): format code according to style guide
```

## 🧪 Testing Guidelines

### Unit Tests

- Test all public methods
- Mock external dependencies
- Test error scenarios
- Use descriptive test names

```typescript
describe('ExampleService', () => {
  let service: ExampleService;
  let httpMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ExampleService(httpMock);
  });

  it('should return data when API call succeeds', () => {
    // Test implementation
  });
});
```

### Component Tests

- Test component initialization
- Test user interactions
- Test input/output properties
- Test lifecycle hooks

```typescript
describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## 🔍 Code Review Process

1. **Automated Checks**: All PRs must pass automated checks
2. **Code Review**: At least one maintainer must approve
3. **Testing**: All new code must have appropriate tests
4. **Documentation**: Update documentation for API changes

## 📚 Documentation

- **Code Comments**: Add comments for complex logic
- **README Updates**: Update README for new features
- **API Documentation**: Document new public APIs
- **Change Log**: Update CHANGELOG.md for significant changes

## 🐛 Issue Templates

When creating issues, please use the appropriate template:

- **Bug Report**: For reporting bugs
- **Feature Request**: For suggesting new features
- **Question**: For asking questions about the project

## 📞 Getting Help

- **GitHub Issues**: Create an issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: Contact the maintainer for private matters

## 🙏 Recognition

Contributors will be recognized in:

- **README.md**: List of contributors
- **CHANGELOG.md**: Credit for significant contributions
- **GitHub**: Contributors section

Thank you for contributing to this project! 🎉 