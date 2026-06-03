```groovy
pipeline {

    agent any

    options {

        timestamps()
        timeout(time: 5, unit: 'MINUTES')
    }

    environment {

        IMAGE_NAME = 'enjetekrushna/employee-pipeline'
    }

    parameters {

        choice(
            name: 'ENVIRONMENT',
            choices: ['DEV','QA','PROD'],
            description: 'Choose deployment environment'
        )
    }

    stages {

        stage('Parallel Checks') {

            parallel {

                stage('Security Scan') {

                    steps {

                        sh 'echo "Running Security Scan..."'
                    }
                }

                stage('Lint Check') {

                    steps {

                        sh 'echo "Running Lint Check..."'
                    }
                }
            }
        }

        stage('Build Image') {

            steps {

                retry(2) {

                    sh '''
                    echo "===== BUILD IMAGE ====="

                    docker build -t employee-app:${BUILD_NUMBER} .
                    '''
                }
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
                    echo "$DOCKER_PASS" | docker login \
                    -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Tag Image') {

            steps {

                sh '''
                docker tag employee-app:${BUILD_NUMBER} \
                ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Push Image') {

            steps {

                sh '''
                docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Manual Approval') {

            input {

                message "Deploy to selected environment?"
                ok "Proceed"
            }

            steps {

                echo "Deployment Approved"
            }
        }

        stage('Deploy') {

            when {

                expression {

                    params.ENVIRONMENT == 'DEV'
                }
            }

            steps {

                sh '''
                helm upgrade --install employee-release \
                ./employee-chart \
                -n dev \
                --set image.tag=${BUILD_NUMBER}
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

            cleanWs()

            echo 'WORKSPACE CLEANED'
        }
    }
}
```
