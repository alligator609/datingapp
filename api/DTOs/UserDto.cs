namespace API.DTOs
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
        public object PhotoUrl { get; internal set; }

        public string KnownAs { get; set; }
    }
}