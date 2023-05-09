namespace DotNETGraphQLWorkshop.API.GraphQL
{
    public class CustomBookFilter
    {
        public int Skip { get; set; }
        public int Take { get; set; }
        public string TitleContains { get; set; }
    }
}
