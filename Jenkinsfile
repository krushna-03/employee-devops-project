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
    }
}
