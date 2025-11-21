// Single source of truth for all technical skills
// Each skill has: name, icon (for Simple Icons), and optionally iconType ('simpleicons' or 'devicon')

export interface TechSkill {
  name: string;
  icon: string;
  iconType?: string;
}

export const techSkills: Record<string, TechSkill[]> = {
  "Machine Learning & AI": [
    { name: "PyTorch", icon: "pytorch", iconType: "simpleicons" },
    { name: "TensorFlow", icon: "tensorflow", iconType: "simpleicons" },
    { name: "Scikit-Learn", icon: "scikitlearn", iconType: "simpleicons" },
    { name: "OpenAI", icon: "openai", iconType: "simpleicons" },
    { name: "LangChain", icon: "langchain", iconType: "simpleicons" },
    // { name: "LangGraph", icon: "langchain", iconType: "simpleicons" },
    { name: "Hugging Face", icon: "huggingface", iconType: "simpleicons" },
    // { name: "CUDA", icon: "nvidia", iconType: "simpleicons" },
  ],
  "Programming Languages": [
    { name: "Python", icon: "python", iconType: "simpleicons" },
    { name: "Bash", icon: "gnubash", iconType: "simpleicons" },
    { name: "Java", icon: "java", iconType: "simpleicons" },
    // { name: "SQL", icon: "database", iconType: "simpleicons" },
    { name: "C#", icon: "c#", iconType: "simpleicons" },
    { name: "C++", icon: "cplusplus", iconType: "simpleicons" },
    { name: "C", icon: "c", iconType: "simpleicons" },
    // { name: "SAS", icon: "sas", iconType: "simpleicons" },
    { name: "JavaScript", icon: "javascript", iconType: "simpleicons" },
    { name: "TypeScript", icon: "typescript", iconType: "simpleicons" },
  ],
//   "Data Processing": [
//     { name: "Pandas", icon: "pandas", iconType: "simpleicons" },
//     { name: "NumPy", icon: "numpy", iconType: "simpleicons" },
//     { name: "PySpark", icon: "apachespark", iconType: "simpleicons" },
//     // { name: "Boto3", icon: "amazonaws", iconType: "simpleicons" },
//     { name: "Matplotlib", icon: "matplotlib", iconType: "simpleicons" },
//   ],
  "Data Platforms & Storage": [
    { name: "PostgreSQL / SQL", icon: "postgresql", iconType: "simpleicons" },
    { name: "Apache Spark", icon: "apachespark", iconType: "simpleicons" },
    { name: "Hadoop", icon: "apachehadoop", iconType: "simpleicons" },
    { name: "Cassandra", icon: "apachecassandra", iconType: "simpleicons" },
    { name: "Hive", icon: "apachehive", iconType: "simpleicons" },
    { name: "Snowflake", icon: "snowflake", iconType: "simpleicons" },
    { name: "MongoDB", icon: "mongodb", iconType: "simpleicons" },
    { name: "Databricks", icon: "databricks", iconType: "simpleicons" },
        // { name: "MS SQL Server", icon: "microsoftsqlserver", iconType: "simpleicons" },
    { name: "Neo4j", icon: "neo4j", iconType: "simpleicons" },
    { name: "Redis", icon: "redis", iconType: "simpleicons" },
    { name: "Kafka", icon: "apachekafka", iconType: "simpleicons" },
  ],
  "Cloud & Infrastructure": [
    { name: "AWS", icon: "amazonaws", iconType: "devicon" },
    { name: "Docker", icon: "docker", iconType: "simpleicons" },
    { name: "Kubernetes", icon: "kubernetes", iconType: "simpleicons" },
    { name: "OpenShift", icon: "redhatopenshift", iconType: "simpleicons" },
    { name: "Jenkins", icon: "jenkins", iconType: "simpleicons" },
    { name: "Terraform", icon: "terraform", iconType: "simpleicons" },
    { name: "Ansible", icon: "ansible", iconType: "simpleicons" },
    { name: "Backstage", icon: "backstage", iconType: "simpleicons" },
    { name: "Git", icon: "git", iconType: "simpleicons" },
    { name: "GitHub", icon: "github", iconType: "simpleicons" },
    { name: "Bitbucket", icon: "bitbucket", iconType: "simpleicons" },
    { name: "Grafana", icon: "grafana", iconType: "simpleicons" },
    { name: "Prometheus", icon: "prometheus", iconType: "simpleicons" },
    { name: "Linux", icon: "linux", iconType: "simpleicons" },
    { name: "JIRA", icon: "jira", iconType: "simpleicons" },
  ],
//   "Web & Frameworks": [
//     { name: "React", icon: "react", iconType: "simpleicons" },
//     { name: "Angular", icon: "angular", iconType: "simpleicons" },
//     { name: "Spring Boot", icon: "springboot", iconType: "simpleicons" },
//     { name: "Webflux", icon: "spring", iconType: "simpleicons" },
//     { name: "Nginx", icon: "nginx", iconType: "simpleicons" },
//   ],
//   "Data & Analytics": [
//     { name: "Trino", icon: "trino", iconType: "simpleicons" },
//     { name: "Power BI", icon: "powerbi", iconType: "simpleicons" },
//     { name: "MATLAB", icon: "mathworks", iconType: "simpleicons" },
//     { name: "Salesforce", icon: "salesforce", iconType: "simpleicons" },
//   ],
//   "Development Tools": [
//     { name: "Jupyter", icon: "jupyter", iconType: "simpleicons" },
//     { name: "VS Code", icon: "visualstudiocode", iconType: "simpleicons" },
//   ],
};

