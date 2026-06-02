```groovy
pipeline {

    agent any

    stages {

        stage('Build Image') {

            steps {

                sh '''
                echo "===== BUILD IMAGE ====="

                docker build -t employee-app:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Docker Login') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo "===== LOGIN TO DOCKERHUB ====="

                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Tag Image') {

            steps {

                sh '''
                echo "===== TAG IMAGE ====="

                docker tag employee-app:${BUILD_NUMBER} enjetekrushna/employee-pipeline:${BUILD_NUMBER}
                '''
            }
        }

        stage('Push Image') {

            steps {

                sh '''
                echo "===== PUSH IMAGE ====="

                docker push enjetekrushna/employee-pipeline:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy') {

            steps {

                sh '''
                echo "===== HELM DEPLOY ====="

                helm upgrade --install employee-release ./employee-chart -n dev --set image.tag=${BUILD_NUMBER}
                '''
            }
        }
    }

    post {

        success {

            echo 'PIPELINE SUCCESSFUL'
        }

        failure {

            echo 'PIPELINE FAILED'
        }

        always {

            echo 'PIPELINE FINISHED'
        }
    }
}
```
