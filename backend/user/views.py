from rest_framework.views import APIView
from .serializer import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt,datetime

# Create your views here.

class Register(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class Login(APIView):
    def post(self,request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('user Not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('incorrect Password')
        
        payload = {
            'id':user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        return Response({
            'jwt' : token
        })
        

class UserView(APIView):
    def get(self, request):
        obj = User.objects.all()
        print(obj)
        serializer = UserSerializer(obj, many=True)
        return Response(serializer.data)
    
    
