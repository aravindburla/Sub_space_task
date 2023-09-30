import axios from "axios";
import _ from "lodash"; 

export const getBlogStats = async(req, res) => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
          headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
          },
        });
        // console.log(response.data);
        const blogData = response.data.blogs;
    
    
        const totalBlogData = blogData.length;
        console.log(totalBlogData);

        const longestTitleBlog = _.maxBy(blogData, 'title.length');
        console.log(longestTitleBlog)

        const blogsWithPrivacyInTitle = _.filter(blogData, (blog) =>
          _.includes(_.toLower(blog.title), 'privacy')
        );
    
        const Titles = _.uniqBy(blogData, 'title');
    
        const statistics = {
          totalBlogData,
          longestTitle: longestTitleBlog.title,
          blogsWithPrivacy: blogsWithPrivacyInTitle.length,
          Titles,
        };
    
        res.json(statistics);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching and analyzing blog data.' });
      }
}

export const search =  async(req, res) => {
    try {
        const  query  = req.query.query; 

        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
          headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
          },
        });
        // console.log(response.data);
        const blogData = response.data.blogs;

        if (!query) {
            return res.status(400).json({ error: 'Please provide a search query.' });
        }

        const data = _.filter(blogData, (blog) => _.includes(_.toLower(blog.title), _.toLower(query)));

        res.json(data);
    } catch (error) {
        
    }
}